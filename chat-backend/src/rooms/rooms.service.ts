import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export class RoomsService {
    static generateRoom() {
        return uuidv4()
    }

    static GetRoomOtherParty(party:string) {
        if(party==="dems") {
            return "reps"
        } else {
            return "dems"
        }
    }
}
