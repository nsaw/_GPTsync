# Terminal Validation Rule - STRICT ENFORCEMENT

## Rule Established

**CRITICAL**: After every Expo restart, I MUST:
1. **Read the terminal output** to see actual errors
2. **Use non-blocking patterns** with timeout to prevent terminal blocking
3. **Validate fixes** by checking if errors are resolved
4. **Never assume success** without seeing terminal confirmation

## Current Issue Analysis

### **Original Problem**
- Metro bundling failing with "Unable to resolve module" errors
- Font resolution issues (resolved)
- Module import path issues (ongoing)

### **Terminal Output Analysis**
From the latest terminal output, I can see:
```
iOS Bundling failed 3009ms index.ts (721 modules)
Unable to resolve "./src-reference/features/auth/screens/SignIn.tsx" from "legacy.App.tsx"
```

### **Root Cause Identified**
The issue is **NOT** with the file extension (removing `.tsx` didn't help). The real issue is that the `SignInScreen` has complex dependencies that are causing module resolution failures.

### **Dependencies Analysis**
`SignInScreen` imports:
- `useAuth` hook
- `LoginForm` component  
- `OAuthButton` component
- `useTheme` hook
- `useGoogleAuth` hook
- `signInWithApple` function
- `logo.png` asset

### **Solution Strategy**
1. **Simplified Approach**: Created a basic test component without complex dependencies
2. **Incremental Testing**: Test basic React Native components first
3. **Dependency Isolation**: Identify which specific dependency is causing the issue

## Current Status

### **✅ Completed**
- Font resolution fixed (using Google Fonts packages)
- Basic React Native imports working
- Non-blocking Expo restart pattern implemented

### **🔄 In Progress**
- Testing simple legacy app component
- Identifying specific module resolution issues
- Validating dual-mount system functionality

### **📋 Next Steps**
1. **Verify Simple Component**: Confirm basic View/Text component loads
2. **Incremental Dependencies**: Add dependencies one by one to identify the problematic one
3. **Alternative Screens**: Try other screens from the available list
4. **Mock Dependencies**: Create mock versions of problematic dependencies

## Terminal Validation Process

### **Before Every Fix**
1. Kill existing Expo process: `kill $(lsof -ti:8081) 2>/dev/null || true`
2. Clear cache: `rm -rf node_modules/.cache && rm -rf .expo`
3. Restart with non-blocking pattern: `{ npx expo start --ios --clear & } >/dev/null 2>&1 & disown`

### **After Every Fix**
1. Wait for bundling: `sleep 25`
2. Check status: `curl -s http://localhost:8081/status`
3. **READ THE TERMINAL OUTPUT** to see actual errors
4. Validate if fix worked or identify new errors

### **Validation Checklist**
- [ ] Expo starts without blocking terminal
- [ ] Metro bundling completes successfully
- [ ] No "Unable to resolve module" errors
- [ ] App loads in simulator/device
- [ ] Dual-mount system responds to environment variable

## Key Learning

**Never assume a fix worked without reading the terminal output.** The terminal provides the actual error messages that guide the debugging process. Without reading these, I cannot validate if my changes were effective.

This rule is now **STRICTLY ENFORCED** for all future debugging sessions. 