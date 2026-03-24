// Supabase migration preparation:
// This file centralizes connection settings so each module can switch from
// localStorage to Supabase without changing UI logic.
(function initSupabaseConfig(globalScope) {
  const SUPABASE_URL =
    globalScope.SUPABASE_URL || "https://cvcmvvfobuelmvobsvue.supabase.co";
  const SUPABASE_ANON_KEY =
    globalScope.SUPABASE_ANON_KEY || "sb_publishable_yUaiuhQG_TQKiuqFSGDF5A_Wc5L90zR";

  function createSupabaseClient() {
    // Supabase is now configured, but the app still uses localStorage through
    // dataService until each module is migrated.
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !globalScope.supabase) {
      return null;
    }

    return globalScope.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  globalScope.VeneziaSupabase = {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    client: createSupabaseClient(),
    isConfigured: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),
  };
})(window);
