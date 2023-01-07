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
    subs = {}
    name = 'self-published'

    constructor(name) {
        if (name) this.name = name
    }

    subscribe(type, callBack) {
        // this.subs[type] = this.subs[type] || []
        if (!this.subs[type]){
            this.subs[type] = []
        }
        this.subs[type].push(callBack)
    }

    unsubscribe(type, callBack) {
        if (!this.subs[type]){
            return
        }
        const i = this.subs[type].indexOf(callBack)
        if (i != -1) {
            this.subs[type].splice(i, 1)
        }
    }

    release(type, issue) {
        this.subs[type]?.forEach(callBack => callBack(issue, this))
    }
}

const pub1 = new Publisher
const pub2 = new Publisher('Lucky Horse')

const sub1 = { name: 'Misha', act(issue) { } }
const sub2 = { name: 'Edgar', act(issue) { } }
const iss1 = { type: 'issue', title: 'issue1' }
const iss2 = { type: 'issue', title: 'issue2' }
const issA = { type: 'issue', title: 'issueA' }
const special = { type: 'special', title: 'Christmas' }

sub1.act = issue => console.log(`${sub1.name} is acting on ${issue.title}`)
sub2.act = (issue, pub) => console.log(`${sub2.name} is reading ${issue.title} from ${pub.name}`)




pub1.subscribe('issue', sub1.act) // sub1.act is saved somewhere
pub1.subscribe('special', sub1.act) // sub1.act is saved somewhere
pub1.subscribe('issue', sub2.act) // sub2.act is saved somewhere
pub2.subscribe('issue', sub2.act) // sub2.act is saved somewhere

pub1.release('issue', iss1) // sub1.act(iss1)  -> Misha is acting on issue1
pub2.release('issue', issA) // sub1.act(iss1)  -> Misha is acting on issue1
pub1.unsubscribe('issue', sub2.act)

setTimeout(() => pub1.release('issue', iss2), 2000) // sub1.act(iss2) in 2sec  -> Misha is acting on issue2
setTimeout(() => pub1.release('special', special), 2000) // sub1.act(iss2) in 2sec  -> Misha is acting on issue2

