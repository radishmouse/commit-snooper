const { repos, token } = require('./config');
const differenceInHours = require('date-fns/differenceInHours');
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: token });

const pprint = (data) => {
  console.log(JSON.stringify(data, null, 4));
};

const fmt = date => {
  try {
    return differenceInHours(new Date(date), new Date()) + ' hours';
    // return formatDistance(new Date(date), new Date(), { addSuffix: true});
  } catch {
    return date;
  }

};

const mostRecent = (d1, d2) => d1 > d2 ? d1 : d2;


const report = repo => {
  octokit.request(`GET /repos/${repo}/events`, {
    headers: {
      'Accept': 'application/vnd.github.cloak-preview+json'
    }  
  }).then(({data}) => {
    
    const info = data.reduce((acc, event) => {
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
    
    console.log(repo);
    pprint(info);
    // pprint(formatted);
    console.log('============');
  });

};

repos.forEach(report);
