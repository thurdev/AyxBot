const fs = require('fs');

module.exports = (client) => {
    

    const events = fs.readdirSync('src/events/', 'utf-8');
    
    events.forEach((eventName) => {
        eventName = eventName.split('.')[0];
        const event = require(`../events/${eventName}`);
        
        if(event.once) {
            client.once(eventName, event.once.bind(null, client));
        }
        

        if(event.run){
            client.on(eventName, event.run.bind(null, client));
        }
    })
    
    
}