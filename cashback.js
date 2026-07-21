/*
====================================================
WhizzzPOS Cashback Module v1.0
====================================================
*/

window.Cashback = {

    percent:5,

    init(){

        if(!App.state.customers)
            App.state.customers=[];

        if(!App.state.cashbackHistory)
            App.state.cashbackHistory=[];

    },

    find(phone){

        return App.state.customers.find(c=>c.phone===phone);

    },

    create(name,phone){

        let customer={

            id:Helpers.uid(),

            name,

            phone,

            cashback:0,

            totalSpent:0,

            createdAt:new Date().toISOString()

        };

        App.state.customers.push(customer);

        Store.save(App.state);

        return customer;

    },

    get(phone){

        let c=this.find(phone);

        if(!c) return null;

        return c.cashback;

    },

    add(phone,amount){

        let c=this.find(phone);

        if(!c) return;

        let cashback=Math.round(amount*this.percent/100);

        c.cashback+=cashback;

        c.totalSpent+=amount;

        this.history(c.id,"ADD",cashback);

        Store.save(App.state);

        return cashback;

    },

    spend(phone,amount){

        let c=this.find(phone);

        if(!c) return false;

        if(c.cashback<amount)
            return false;

        c.cashback-=amount;

        this.history(c.id,"SPEND",amount);

        Store.save(App.state);

        return true;

    },

    history(customerId,action,amount){

        App.state.cashbackHistory.push({

            id:Helpers.uid(),

            customerId,

            action,

            amount,

            date:new Date().toISOString()

        });

    },

    getHistory(customerId){

        return App.state.cashbackHistory.filter(h=>h.customerId===customerId);

    }

};

Cashback.init();
