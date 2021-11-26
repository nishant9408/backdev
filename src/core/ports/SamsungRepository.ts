import { SamsungSubscriber } from '../data/SamsungSubscriber';

export interface SamsungRepository {
    saveSamsungSubscriber(data: SamsungSubscriber): Promise<SamsungSubscriber>;
    findSamsungSubscriber(email: string): Promise<SamsungSubscriber | null>;
}
