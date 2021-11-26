import { Device } from '../data/Device';

export interface DeviceRepository {
    saveDevice(data: Device): Promise<Device>;
    findDeviceData(userId: string): Promise<Device | null>;
    findDeviceByIds(ids: string[]): Promise<Device[]>;
    findAllNotifiableDevices(): Promise<Device[]>;
}
