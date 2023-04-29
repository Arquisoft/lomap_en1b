const mongoose = require('mongoose');
const { model, Schema } = mongoose
const SharedListSchema = new Schema({
    //ID of the owner of the locations
    owner: String,
    //List with the IDs of those who can see it
    sharedList: [String]
});

SharedListSchema.statics.getSharedListFor = function(userWebId : String): Promise<string[]> {
    return this.model('SharedList').findOne({owner: userWebId})
        //@ts-ignore
        .then(result => {
            if (result === null) {
                return [] as string[];
            } else {
                return JSON.stringify(result.sharedList);
            }
        })
        //@ts-ignore
        .catch(err => {
            console.log(err);
        });
};

SharedListSchema.statics.addToList = function(userWebId : String , friendWebId : String) {
    this.model('SharedList').find({ owner: userWebId })
        //@ts-ignore
        .then( result => {
            if(result.sharedList.length <= 0){
                const newList = new SharedListModel({
                    owner: userWebId,
                    sharedList: [friendWebId]
                })
                newList.save()
            }else{
                result.sharedList.push(friendWebId)
            }
        })
        //@ts-ignore
        .catch(err => {
            console.log(err)
        });
};

SharedListSchema.statics.removeFromList = function(userWebId : String , friendWebId : String) {
    this.model('SharedList').find({ owner: userWebId })
        //@ts-ignore
        .then( result => {
            let newArray = result.sharedList.filter((e : String) => e !== friendWebId)
            result.sharedList = newArray;
        })
        //@ts-ignore
        .catch(err => {
            console.log(err)
        });
};

export const SharedListModel = model('SharedList', SharedListSchema)


