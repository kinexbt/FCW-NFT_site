import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://qmflnlfamuiilqcipzdv.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtZmxubGZhbXVpaWxxY2lwemR2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ2ODkxNiwiZXhwIjoyMDY5MDQ0OTE2fQ.7DfXWszCBLY5xCzJLbbsqUPt-rlaOTbHLZUonD-h3FQ'
);
// export async function getMintGroupLabel(wallet: PublicKey, connection: Connection): Promise<string> {
export async function set_WL_state(userAddress: any): Promise<number> {
    // Check allowlist in Supabase
    const { data, error } = await supabase
        .from('allowlist')
        .select('*')
        .eq('walletAddress', userAddress);

    console.log("🧐 Existing record:", data);
    if (data != null) {
        console.log(userAddress, typeof userAddress);
        const { data, error } = await supabase
            .from('allowlist')
            .update({ wl500k_Used: true }) // field(s) to update
            .eq('walletAddress', userAddress);
        console.log(data, "👌👌👌");
        if (error) {
            console.error("❌ Update failed:", error.message);
            return 0;
        } else {
            console.log("✅ Updated allowlist entry:", data);
            return 1;
        }
    }
    return 0;
}