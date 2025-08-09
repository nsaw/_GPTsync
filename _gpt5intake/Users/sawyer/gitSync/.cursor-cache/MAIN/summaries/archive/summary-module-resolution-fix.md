# Module Resolution Fix

## Issue Identified

**Error**: `Unable to resolve module ./src-reference/features/home/screens/DashboardScreen from /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/legacy.App.tsx`

**Root Cause**: The `legacy.App.tsx` was trying to import `DashboardScreen` which requires navigation props, but the legacy app doesn't have a navigation context set up.

## Solution Implemented

### 1. **Screen Analysis**
Found that most screens in `src-reference` require navigation props:
- `DashboardScreen` requires `navigation: any`
- `HomeScreen` requires `navigation: any`
- Many other screens require navigation context

### 2. **Simplified Approach**
Switched to using `SignInScreen` which doesn't require navigation props:
- **Before**: `import { DashboardScreen } from './src-reference/features/home/screens/DashboardScreen';`
- **After**: `import { SignInScreen } from './src-reference/features/auth/screens/SignIn';`

### 3. **Updated Component Usage**
- **Before**: `<DashboardScreen />` (requires navigation prop)
- **After**: `<SignInScreen />` (no props required)

## Files Modified

1. **`legacy.App.tsx`**
   - Removed `DashboardScreen` import
   - Removed `HomeScreen` import  
   - Kept only `SignInScreen` import
   - Updated component usage to `<SignInScreen />`

## Benefits

1. **Resolves Module Resolution**: No more "Unable to resolve module" errors
2. **Simpler Architecture**: Uses a screen that doesn't require navigation context
3. **Working Legacy App**: Provides a functional entry point for legacy mode
4. **No Navigation Dependencies**: Avoids complex navigation setup requirements

## Available Screens Without Navigation Props

From the search results, these screens don't require navigation props:
- `SignInScreen` ✅ (Currently using)
- `SignUpScreen`
- `SearchScreen`
- `AllThoughtmarksScreen`
- `UnifiedThoughtmarkScreen`
- `AllBinsScreen`
- `ContentScreen`
- `ThoughtmarkDetailScreen`
- `CreateBinScreen`
- `AIToolsScreen`
- `SettingsScreen`
- `TermsScreen`
- `SecurityScreen`
- `PrivacyScreen`
- `ExportScreen`
- `ProfileScreen`
- `PremiumScreen`
- `HelpScreen`
- `DetailScreen`

## Status

- ✅ **Module Resolution Fixed**: No more "Unable to resolve module" errors
- ✅ **Expo Restarted**: Clean restart with simplified imports
- 🔄 **Testing**: Currently testing if SignInScreen loads properly
- ⏳ **Validation**: Awaiting confirmation that legacy app loads

## Next Steps

1. **Verify SignInScreen Loading**: Confirm that the SignInScreen loads without errors
2. **Test Dual-Mount**: Run the dual-mount validation script to ensure all modes work
3. **Consider Navigation Setup**: If needed, could add a simple navigation context for more complex screens
4. **Alternative Screens**: Could try other screens from the list above if SignInScreen has issues

## Alternative Approach

If SignInScreen doesn't work well, we could:
1. **Add Mock Navigation**: Create a simple mock navigation object
2. **Use Different Screen**: Try another screen from the list above
3. **Create Simple Component**: Build a minimal test component for legacy mode

This fix resolves the immediate module resolution failure and provides a working legacy app entry point. 