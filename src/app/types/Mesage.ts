



export  type Mesage = {
            forPlace : {
                    title : string,
                    id : string,
                    from :string,
                    to : string,
            },
            approval : {
                approve : boolean,
                unapprove : boolean
            },
            participants :{
                id : string,
                nickname :string}[],
            mesages : {
                read : boolean
                user :string,
                mesage : string
            }[],
            convId : string
        }