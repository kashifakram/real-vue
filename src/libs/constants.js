import axios from 'axios';

export const jsonServerBaseUrl = '//localhost:3000';
export const nodeServerBaseUrl = '//localhost:4000';
export const jsonServerEventsUrl = '/dashboard/';
export const nodeServerEventsUrl = '/events/';
export const nodeServerEventUrl = '/event/';
export const apiClient = axios.create();
