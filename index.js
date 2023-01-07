const pub1 = {subscribe(callBack){}, release(issue){}}
const sub1 = {name: 'Misha', act(issue){}}
const sub2 = {name: 'Edgar', act(issue){}}
const iss1 = {title: 'issue1'}
const iss2 = {title: 'issue2'}

sub1.act = issue => console.log(`${sub1.name} is acting on ${issue.title}`)
sub2.act = issue => console.log(`${sub2.name} is acting on ${issue.title}`)

pub1.subscribe = callBack => pub1.subscriberAct = callBack
pub1.release = issue => pub1.subscriberAct(issue) 

pub1.subscribe(sub1.act) // sub1.act is saved somewhere

pub1.release(iss1) // sub1.act(iss1)  -> Misha is acting on issue1

setTimeout(() => pub1.release(iss2), 2000) // sub1.act(iss2) in 2sec  -> Misha is acting on issue2

