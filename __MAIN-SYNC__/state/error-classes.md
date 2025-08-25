# Error Classes & Resolution Patterns

## Known Error Classes

### 1. Component Registration Errors
**Pattern**: "Component X not registered"
**Cause**: React Native requires all components to be registered before use
**Resolution**: 
- Create alias files in entry/app/auth/ for auth components
- Register components in App.tsx with AppRegistry
- Use thin re-export files (e.g., SignInScreen.tsx re-exporting SignIn)

**Example**:
```typescript
// entry/app/auth/SignInScreen.tsx
export { SignIn as SignInScreen } from '../../../src-nextgen/screens/auth/SignIn';
```

### 2. Firebase AsyncStorage Warnings
**Pattern**: "AsyncStorage has been extracted from react-native core"
**Cause**: Firebase SDK uses deprecated AsyncStorage
**Resolution**: 
- Install @react-native-async-storage/async-storage
- Update Firebase configuration
- Non-blocker: app continues to function

### 3. HeadersInit Type Alias Errors
**Pattern**: "Cannot find name 'HeadersInit'"
**Cause**: TypeScript type definition missing
**Resolution**:
- Ensure HeadersInit alias exists at `/src-reference/types/global.d.ts`
- Use ts-headersinit-guard.cjs to enforce location
- Non-blocker: can be ignored in development

### 4. Import Path Resolution Errors
**Pattern**: "Cannot resolve module"
**Cause**: Incorrect import paths or missing files
**Resolution**:
- Verify file exists at specified path
- Check for case sensitivity issues
- Update import statements to match actual file structure

### 5. Metro Bundler Errors
**Pattern**: "Unable to resolve module"
**Cause**: Metro cannot find imported modules
**Resolution**:
- Clear Metro cache: `npx expo start --clear`
- Check metro.config.cjs configuration
- Verify module resolution settings

### 6. TypeScript Compilation Errors
**Pattern**: "Type 'X' is not assignable to type 'Y'"
**Cause**: Type mismatches in component props or state
**Resolution**:
- Fix type definitions
- Update component interfaces
- Ensure proper type imports

## Blocker vs Non-Blocker Classification

### Blockers (Must Fix)
- Component registration errors
- Import path resolution errors
- Metro bundler errors
- TypeScript compilation errors

### Non-Blockers (Can Continue)
- Firebase AsyncStorage warnings
- HeadersInit type alias warnings
- Console warnings about deprecated APIs
- Performance warnings

## Resolution Workflow

### 1. Identify Error Class
- Match error message to known patterns
- Classify as blocker or non-blocker

### 2. Apply Resolution Pattern
- Use established resolution strategies
- Follow guardrail guidelines
- Maintain architecture integrity

### 3. Validate Fix
- Run validate-runtime.cjs
- Check for regression
- Ensure no new errors introduced

### 4. Document Resolution
- Update error-classes.md if new pattern discovered
- Record successful resolution strategies
- Share knowledge with team

## Prevention Strategies

### 1. Proactive Guards
- Use no-mock-regression.cjs to prevent mock components
- Enforce ts-headersinit-guard.cjs for type aliases
- Validate component registration patterns

### 2. Development Practices
- Use absolute paths for imports
- Follow established naming conventions
- Maintain consistent file structure

### 3. Validation Loop
- Run validate-runtime.cjs regularly
- Use refresh-fix-loop.thoughtful.v3.2.cjs for intelligent error handling
- Pause for surgical fixes rather than blind loops
