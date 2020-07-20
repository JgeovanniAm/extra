// Subscribe Publish
const Mediator = function () {
  const TOPICS = {};
  return {
    Subscribe: function (topic, callback) {
      if (!topic) console.log('Invalid topic');
      if (!callback || typeof callback !== 'function') console.log('Invalid callback');
      // topics does not exists
      if (!TOPICS[topic]) TOPICS[topic] = [];
      // register the callback
      TOPICS[topic].push(callback);
    },
    Publish: function (topic, data) {
      if (!TOPICS[topic]) {
        console.log('Invalid topic')
        return false
      };
      TOPICS[topic].forEach(callback => callback(data));
    }
  }
};

console.log(Subscribe)

Mediator.Subscribe('persona', (data) => {
  console.log(data)
});

Mediator.Subscribe('que paso', (data) => {
  console.log(data)
});


window.onclick = () => {
  Mediator.Publish('persona', { name: 'jimmy', age: 38 })
}

window.onload = () => {
  Mediator.Publish('que paso', { name: 'eva', age: 13 })
}




// ---------------------------


class Participant {
  constructor(name) {
    this.name = name;
    this.chatroom = null;
  }

  send(message, to) {
    this.chatroom.send(message, this, to);
  }

  receive(message, from) {
    console.log(from.name + " to " + this.name + ": " + message);
  }
}

let Chatroom = function () {
  let participants = {};

  return {
    register: function (participant) {
      participants[participant.name] = participant;
      participant.chatroom = this;
      console.log(this, participants)
    },

    send: function (message, from, to) {
      if (to) {                      // single message
        to.receive(message, from);
      } else {                       // broadcast message
        for (let key in participants) {
          if (participants[key] !== from) {
            participants[key].receive(message, from);
          }
        }
      }
    }
  };
};

function run() {
  let yoko = new Participant('Yoko'),
    ringo = new Participant('Ringo'),
    chatroom = new Chatroom();

  chatroom.register(yoko);
  chatroom.register(ringo);

  yoko.send('All you need is love.');
  yoko.send('I love you John.');
}

run()