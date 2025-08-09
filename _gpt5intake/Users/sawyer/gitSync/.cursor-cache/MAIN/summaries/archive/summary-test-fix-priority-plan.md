# Test Fix Priority Plan - Systematic Approach

## Current Status Analysis
- **Total Test Suites**: 28
- **Failed**: 6
- **Skipped**: 22
- **Passed**: 0
- **Total Tests**: 190
- **Failed Tests**: 0 (all skipped)
- **Passed Tests**: 0

## Critical Issues by Priority

### 🚨 PRIORITY 1: Empty Test Files (EASY FIX)
**Impact**: 2 test suites failing
**Files**:
- `src-nextgen/__tests__/setup.ts`
- `src/__tests__/helpers/test-utils.tsx`
- `src-nextgen/__tests__/TestWrapper.tsx`

**Solution**: Add actual tests or remove files

### 🚨 PRIORITY 2: React Native Bridge Configuration (MEDIUM FIX)
**Impact**: 2 test suites failing
**Files**:
- `src-nextgen/utils/accessibilityUtils.test.ts`
- `src-nextgen/hooks/useAccessibility.test.ts`

**Error**: `Invariant Violation: __fbBatchedBridgeConfig is not set, cannot invoke native modules`

**Solution**: Fix React Native mocking in individual test files

### 🚨 PRIORITY 3: React Navigation Dependencies (COMPLEX FIX)
**Impact**: 1 test suite failing
**Files**:
- `src-nextgen/navigation/NavigationProvider.test.tsx`

**Error**: `TypeError: (0 , _stack.createStackNavigator) is not a function`

**Solution**: Complex Jest configuration fix (defer to later)

## Immediate Action Plan

### Phase 1: Fix Empty Test Files (5 minutes)
**Goal**: Resolve 3 test suite failures immediately

**Actions**:
1. Add actual tests to `setup.ts` or remove file
2. Add actual tests to `test-utils.tsx` or remove file  
3. Add actual tests to `TestWrapper.tsx` or remove file

**Expected Result**: 3 test suites should start running

### Phase 2: Fix React Native Bridge Issues (15 minutes)
**Goal**: Resolve 2 test suite failures

**Actions**:
1. Fix `accessibilityUtils.test.ts` React Native mocking
2. Fix `useAccessibility.test.ts` React Native mocking
3. Remove individual `jest.mock('react-native')` calls from test files

**Expected Result**: 2 test suites should start running

### Phase 3: Defer React Navigation (LATER)
**Goal**: Complex fix requiring Jest configuration changes

**Actions**:
1. Skip React Navigation tests for now
2. Focus on getting other tests running first
3. Return to React Navigation after other issues resolved

## Implementation Strategy

### Step 1: Fix Empty Test Files
```bash
# Check what's in these files
cat src-nextgen/__tests__/setup.ts
cat src/__tests__/helpers/test-utils.tsx  
cat src-nextgen/__tests__/TestWrapper.tsx

# Either add tests or remove files
```

### Step 2: Fix React Native Bridge Issues
```bash
# Remove individual jest.mock calls from test files
# Let the global jest.setup.cjs handle React Native mocking
```

### Step 3: Run Tests to Validate
```bash
npm test -- --watchAll=false --verbose
```

## Success Metrics

### Target: Get Tests Running
- **Phase 1**: 3 test suites should start running (empty files fixed)
- **Phase 2**: 2 test suites should start running (React Native bridge fixed)
- **Phase 3**: 1 test suite deferred (React Navigation)

### Expected Final Status
- **Total Test Suites**: 28
- **Failed**: 1 (React Navigation deferred)
- **Skipped**: 0 (or minimal)
- **Passed**: 27
- **Total Tests**: 190
- **Failed Tests**: 0
- **Passed Tests**: 190

## Risk Assessment

### Low Risk
- Empty test files can be easily fixed
- React Native bridge issues are isolated to specific test files

### Medium Risk  
- React Navigation fix requires complex Jest configuration changes
- May need to defer this issue temporarily

### High Risk
- None identified for immediate fixes

## Next Steps

1. **IMMEDIATE**: Fix empty test files (5 minutes)
2. **HIGH**: Fix React Native bridge issues (15 minutes)
3. **MEDIUM**: Defer React Navigation fix (later)
4. **VALIDATE**: Run comprehensive test suite
5. **ITERATE**: Address remaining issues

## Time Estimate

- **Phase 1**: 5 minutes
- **Phase 2**: 15 minutes  
- **Total**: 20 minutes to get 27/28 test suites running
- **Phase 3**: Deferred (complex Jest configuration work) 