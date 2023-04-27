const { model, Schema } = mongoose
const SharedListSchema = new Schema({
    //ID of the owner of the locations
    owner: String,
    //List with the IDs of those who can see it
    sharedList: [String]
})

SharedListSchema.methods.getSharedListFor = function getSharedListFor (userWebId : String) {
    this.model('SharedList').find({ owner: userWebId })
        //@ts-ignore
        .then( result => {
            return result.sharedList
        })
        //@ts-ignore
        .catch(err => {
            console.log(err)
        });
};

SharedListSchema.methods.addToList = function addToList (userWebId : String , friendWebId : String) {
    this.model('SharedList').find({ owner: userWebId })
        //@ts-ignore
        .then( result => {
            if(result.sharedList.length <= 0){
                const newList = new SharedList({
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

SharedListSchema.methods.removeFromList = function removeFromList (userWebId : String , friendWebId : String) {
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

const SharedList = model('SharedList', SharedListSchema)
export default  SharedList;

