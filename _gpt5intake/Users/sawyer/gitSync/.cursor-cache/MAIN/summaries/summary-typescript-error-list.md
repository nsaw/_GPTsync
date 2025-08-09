# TypeScript Error List - Foundation Remediation

**Generated**: 2025-01-27T23:35:00Z  
**Agent**: BRAUN (MAIN)  
**Status**: 🔧 **36 ERRORS IDENTIFIED - SYSTEMATIC FIXING REQUIRED**  
**Priority**: CRITICAL  

## 📋 **COMPREHENSIVE ERROR LIST**

### **File: src-nextgen/components/GlobalErrorBoundary.tsx**
**Line 317**: `Property 'theme' does not exist on type 'Theme'`
- **Issue**: Theme interface missing 'theme' property
- **Fix Required**: Add theme property to Theme interface or fix useTheme hook

### **File: src-nextgen/hooks/useAppIntegration.ts**
**Line 3**: `'"../state/stores/themeStore"' has no exported member named 'useThemeStore'`
- **Issue**: Missing useThemeStore export
- **Fix Required**: Create useThemeStore hook or fix import

**Line 62**: `Property 'login' does not exist on type 'UseAuthReturn'`
- **Issue**: Missing login method in UseAuthReturn
- **Fix Required**: Add login method to useAuth hook

**Line 86**: `Property 'login' does not exist on type 'UseAuthReturn'`
- **Issue**: Missing login method in UseAuthReturn
- **Fix Required**: Add login method to useAuth hook

**Line 105**: `Property 'logout' does not exist on type 'UseAuthReturn'`
- **Issue**: Missing logout method in UseAuthReturn
- **Fix Required**: Add logout method to useAuth hook

**Line 151**: `Property 'setTheme' does not exist on type 'Theme'`
- **Issue**: Missing setTheme method in Theme
- **Fix Required**: Add setTheme method to theme hook

**Line 156**: `Property 'toggleTheme' does not exist on type 'Theme'`
- **Issue**: Missing toggleTheme method in Theme
- **Fix Required**: Add toggleTheme method to theme hook

**Line 191**: `Property 'loading' does not exist on type 'BinsState & BinsActions'`
- **Issue**: Should be 'isLoading' not 'loading'
- **Fix Required**: Change 'loading' to 'isLoading'

**Line 194**: `Property 'getBin' does not exist on type 'BinsState & BinsActions'`
- **Issue**: Missing getBin method
- **Fix Required**: Add getBin method to useBins hook

**Line 204**: `Property 'getThoughtmark' does not exist on type 'UseThoughtmarksReturn'`
- **Issue**: Missing getThoughtmark method
- **Fix Required**: Add getThoughtmark method to useThoughtmarks hook

### **File: src-nextgen/integration/CoreSystemsIntegration.tsx**
**Line 10**: `'"../state/stores/themeStore"' has no exported member named 'useThemeStore'`
- **Issue**: Missing useThemeStore export
- **Fix Required**: Create useThemeStore hook or fix import

**Line 18**: `Module '"../screens/SearchScreen"' has no exported member 'SearchScreen'`
- **Issue**: Missing SearchScreen export
- **Fix Required**: Add SearchScreen export or fix import

**Line 19**: `Module '"../screens/ProfileScreen"' has no exported member 'ProfileScreen'`
- **Issue**: Missing ProfileScreen export
- **Fix Required**: Add ProfileScreen export or fix import

**Line 20**: `Module '"../screens/SettingsScreen"' has no exported member 'SettingsScreen'`
- **Issue**: Missing SettingsScreen export
- **Fix Required**: Add SettingsScreen export or fix import

**Line 24**: `Module '"../screens/content/AllBinsScreen"' has no exported member 'AllBinsScreen'`
- **Issue**: Missing AllBinsScreen export
- **Fix Required**: Add AllBinsScreen export or fix import

**Line 25**: `Module '"../screens/content/ThoughtmarkDetailScreen"' has no exported member 'ThoughtmarkDetailScreen'`
- **Issue**: Missing ThoughtmarkDetailScreen export
- **Fix Required**: Add ThoughtmarkDetailScreen export or fix import

**Line 32**: `Type 'TabParamList' does not satisfy the constraint 'ParamListBase'`
- **Issue**: TabParamList missing index signature
- **Fix Required**: Add index signature to TabParamList

**Line 39**: `Type is not assignable to NavigatorID`
- **Issue**: Navigation configuration type mismatch
- **Fix Required**: Fix navigation configuration types

**Line 165**: `Type '"app-root"' is not assignable to type 'LayoutRole'`
- **Issue**: Invalid layoutRole value
- **Fix Required**: Fix layoutRole value or update LayoutRole type

### **File: src-nextgen/services/ApiServiceIntegration.ts**
**Line 2**: `Module '"./userService"' has no exported member 'userService'`
- **Issue**: Missing userService export
- **Fix Required**: Add userService export or fix import

**Line 38**: `Property 'initialize' does not exist on type 'typeof ErrorService'`
- **Issue**: Missing initialize method
- **Fix Required**: Add initialize method to ErrorService

**Line 41**: `Property 'initialize' does not exist on type 'typeof AnalyticsService'`
- **Issue**: Missing initialize method
- **Fix Required**: Add initialize method to AnalyticsService

**Line 42**: `Property 'initialize' does not exist on type 'SecurityService'`
- **Issue**: Missing initialize method
- **Fix Required**: Add initialize method to SecurityService

**Line 145**: `Property 'sendVerificationEmail' does not exist on type 'EmailServiceImpl'`
- **Issue**: Missing sendVerificationEmail method
- **Fix Required**: Add sendVerificationEmail method

**Line 157**: `Property 'sendPasswordResetEmail' does not exist on type 'EmailServiceImpl'`
- **Issue**: Missing sendPasswordResetEmail method
- **Fix Required**: Add sendPasswordResetEmail method

**Line 170**: `Expected 1 arguments, but got 2`
- **Issue**: Wrong number of arguments for trackEvent
- **Fix Required**: Fix trackEvent method signature

**Line 182**: `Property 'setUserProperties' does not exist on type 'typeof AnalyticsService'`
- **Issue**: Missing setUserProperties method
- **Fix Required**: Add setUserProperties method

**Line 195**: `Property 'validateToken' does not exist on type 'SecurityService'`
- **Issue**: Missing validateToken method
- **Fix Required**: Add validateToken method

**Line 237**: `Property 'logError' does not exist on type 'typeof ErrorService'`
- **Issue**: Missing logError method
- **Fix Required**: Add logError method

**Line 243**: `Expected 1 arguments, but got 2`
- **Issue**: Wrong number of arguments for trackEvent
- **Fix Required**: Fix trackEvent method signature

**Line 247**: `Property 'catch' does not exist on type 'void'`
- **Issue**: trackEvent returns void, not Promise
- **Fix Required**: Fix trackEvent return type

**Line 261**: `Argument of type 'string' is not assignable to parameter of type 'AnalyticsEvent'`
- **Issue**: Wrong parameter type for trackEvent
- **Fix Required**: Fix trackEvent parameter type

**Line 262**: `Property 'validateToken' does not exist on type 'SecurityService'`
- **Issue**: Missing validateToken method
- **Fix Required**: Add validateToken method

**Line 285**: `Property 'cleanup' does not exist on type 'typeof ErrorService'`
- **Issue**: Missing cleanup method
- **Fix Required**: Add cleanup method

**Line 286**: `Property 'cleanup' does not exist on type 'typeof AnalyticsService'`
- **Issue**: Missing cleanup method
- **Fix Required**: Add cleanup method

**Line 287**: `Property 'cleanup' does not exist on type 'SecurityService'`
- **Issue**: Missing cleanup method
- **Fix Required**: Add cleanup method

---

## 🛠️ **FIXING PRIORITY**

### **Priority 1: Theme System (3 errors)**
1. Fix Theme interface (GlobalErrorBoundary.tsx:317)
2. Create useThemeStore hook (useAppIntegration.ts:3, CoreSystemsIntegration.tsx:10)
3. Add theme methods to Theme interface (useAppIntegration.ts:151,156)

### **Priority 2: Auth System (3 errors)**
1. Add login method to UseAuthReturn (useAppIntegration.ts:62,86)
2. Add logout method to UseAuthReturn (useAppIntegration.ts:105)

### **Priority 3: State Management (3 errors)**
1. Fix loading/isLoading property (useAppIntegration.ts:191)
2. Add getBin method to useBins (useAppIntegration.ts:194)
3. Add getThoughtmark method to useThoughtmarks (useAppIntegration.ts:204)

### **Priority 4: Screen Exports (5 errors)**
1. Add SearchScreen export
2. Add ProfileScreen export
3. Add SettingsScreen export
4. Add AllBinsScreen export
5. Add ThoughtmarkDetailScreen export

### **Priority 5: Navigation System (3 errors)**
1. Fix TabParamList index signature
2. Fix navigation configuration types
3. Fix layoutRole value

### **Priority 6: Service Layer (17 errors)**
1. Add userService export
2. Add initialize methods to all services
3. Add missing service methods
4. Fix method signatures and return types

---

## 📊 **ERROR SUMMARY**

### **By Category**
- **Theme System**: 3 errors
- **Auth System**: 3 errors
- **State Management**: 3 errors
- **Screen Exports**: 5 errors
- **Navigation System**: 3 errors
- **Service Layer**: 17 errors

### **By File**
- **GlobalErrorBoundary.tsx**: 1 error
- **useAppIntegration.ts**: 9 errors
- **CoreSystemsIntegration.tsx**: 9 errors
- **ApiServiceIntegration.ts**: 17 errors

### **Total**: 36 errors across 4 files

---

**Status**: 🔧 **36 ERRORS IDENTIFIED - SYSTEMATIC FIXING REQUIRED**
**Next Action**: Start with Priority 1 (Theme System) fixes
**Goal**: Reduce errors to 0 before proceeding with patch execution 