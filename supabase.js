// ======================================================
// SUPABASE
// ======================================================

const SUPABASE_URL =
    "https://mhvqzplulmxyrbwooczv.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_ws_io3r9z8fE3usldayUVA_rMjnKVYM";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
