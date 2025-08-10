import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qmflnlfamuiilqcipzdv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtZmxubGZhbXVpaWxxY2lwemR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0Njg5MTYsImV4cCI6MjA2OTA0NDkxNn0.uy7xbqzIYyGdifnH78bTu6edFqU-QBxJtFgTwtkSWSg'
);
// export async function getMintGroupLabel(wallet: PublicKey, connection: Connection): Promise<string> {
export async function get_WL_state(userAddress: any): Promise<number> {
  // Check allowlist in Supabase
  console.log(userAddress, typeof userAddress);
  const { data, error } = await supabase.from('allowlist').select('*').eq('walletAddress', userAddress);
  console.log(data, "👌👌👌");
  if (data != undefined) {
    if (data?.length > 0) {
      if (data[0]["wl500k_Used"])
        return 2;   // Already minted NFT free as Whitelist + 500k+
      else
        return 1;   // Not yet, mint NFT free as Whitelist + 500k+
    }
    // Is not whitelist
  }
  return 0;
}