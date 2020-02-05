import * as Ably from 'ably'

const options: Ably.Types.ClientOptions = { key: '_l5KQg.o9bVLg:JDoUSyl7omD7G4qU' }

const client = new Ably.Realtime(options) /* inferred type Ably.Realtime */

export const ablyChannel = client.channels.get('feed') /* inferred type Ably.Types.RealtimeChannel */
