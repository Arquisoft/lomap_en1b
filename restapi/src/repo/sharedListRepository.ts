import {SharedListModel} from './models/SharedList';

export const SharedListRepository = {
    async addToSharedList(userWebId: string, friendId: string) {
        SharedListModel.addToList(userWebId, friendId)
    },
    async removeFromSharedList(userWebId: string, friendId: string) {
        SharedListModel.getSharedListFor(userWebId, friendId)
    },

    async getSharedListFor (userWebId : String) {
        return await SharedListModel.getSharedListFor(userWebId)
    },


};