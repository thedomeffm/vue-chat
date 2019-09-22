import UserRepository from './repository/UserRepository';
import RoomRepository from './repository/RoomRepository';

export default function startDatabaseService() {
    // reset database
    UserRepository.purge();
    RoomRepository.purge();
}
