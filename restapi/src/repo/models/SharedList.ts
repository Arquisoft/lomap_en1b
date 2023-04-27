const { model, Schema } = mongoose
const SharedListSchema = new Schema({
    //ID del propietario de la localizacion
    owner: String,
    //LIst with the IDs of those who can see it
    sharedList: [String]
})

SharedListSchema.methods.getSharedListFor = function getSharedListFor (userWebId : String) {
    return this.model('SharedList').find({ owner: userWebId });
};

SharedListSchema.methods.addToList = function getSharedLocations (friendWebId : String) {
    this.sharedList.push(friendWebId);
};

SharedListSchema.methods.removeFromList = function isOwner (friendWebId: String) {
    let newArray = this.sharedList.filter((e : String) => e !== friendWebId)
    this.SharedList = null;
    this.SharedList = newArray;
};

const SharedList = model('SharedList', SharedListSchema)
export default  SharedList;

