// function Publisher(name) {
//     this.subs = []
//     this.name = name
// }
// Publisher.prototype.subscribe = function (callBack) {
//     this.subs.push(callBack)
// }
// Publisher.prototype.release = function (issue) {
//     this.subs.forEach(callBack => callBack(issue, this))
// }

class Publisher {
    subs = []
    name = 'self-published'

    constructor(name) {
        if (name) this.name = name
    }

    subscribe(callBack) {
        this.subs.push(callBack)
    }

    unsubscribe(callBack) {
        const i = this.subs.indexOf(callBack)
        if (i != -1) {
            this.subs.splice(i, 1)
        }
    }

    release(issue) {
        this.subs.forEach(callBack => callBack(issue, this))
    }
}

const pub1 = new Publisher
const pub2 = new Publisher('Lucky Horse')

const sub1 = { name: 'Misha', act(issue) { } }
const sub2 = { name: 'Edgar', act(issue) { } }
const iss1 = { title: 'issue1' }
const iss2 = { title: 'issue2' }
const issA = { title: 'issueA' }

sub1.act = issue => console.log(`${sub1.name} is acting on ${issue.title}`)
sub2.act = (issue, pub) => console.log(`${sub2.name} is reading ${issue.title} from ${pub.name}`)




pub1.subscribe(sub1.act) // sub1.act is saved somewhere
pub1.subscribe(sub2.act) // sub2.act is saved somewhere
pub2.subscribe(sub2.act) // sub2.act is saved somewhere

pub1.release(iss1) // sub1.act(iss1)  -> Misha is acting on issue1
pub2.release(issA) // sub1.act(iss1)  -> Misha is acting on issue1
pub1.unsubscribe(sub2.act)

setTimeout(() => pub1.release(iss2), 2000) // sub1.act(iss2) in 2sec  -> Misha is acting on issue2

