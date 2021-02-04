const { repos, token } = require('./config');
const differenceInMinutes = require('date-fns/differenceInMinutes');
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: token });

const validEvents = [
  'PushEvent',
  'PullRequestEvent',
  'CreateEvent'
];

const pprint = (data) => {
  console.log(JSON.stringify(data, null, 4));
};

const fmt = date => {
  // try {
  const diff = Math.abs(differenceInMinutes(new Date(date), new Date()));
  let str = `${diff} minutes ago`;
  str += ` (${(diff/60).toFixed(2)} hours)`;
  return str;
    // return formatDistance(new Date(date), new Date(), { addSuffix: true});
  // } catch {
    // return date;
  // }

};

const mostRecent = (d1, d2) => d1 > d2 ? d1 : d2;

const getEvents = repo => {
  return octokit.request(`GET /repos/${repo}/events`, {
    per_page: 100,
    headers: {
      'Accept': 'application/vnd.github.cloak-preview+json'
    }  
  }).then(({data}) => {
    
    const info = data.reduce((acc, event) => {

      if (!validEvents.includes(event.type)) return acc; 
      
      if (!acc[event.actor.login]) {
        acc[event.actor.login] = {
          count: 1,
          last: event.created_at
        };      
      } else {
        acc[event.actor.login] = {
          count: acc[event.actor.login].count + 1,
          last: mostRecent(event.created_at, acc[event.actor.login].last)
        };
      }
      return acc;
    }, {});

    // const formatted = Object.keys(info).map(contributor => ({
      // ...info[contributor],
      // last: fmt(info[contributor].last)
    // }));

    for (let contributor in info) {
      info[contributor].last = fmt(info[contributor].last);
    }

    const summary = {
      name: repo,
      contributions: info
    };
    return summary;
  });

};

const pArray = repos.map(getEvents);
Promise.all(pArray).then(info => {
    pprint(info);
    console.log('============');  
});
