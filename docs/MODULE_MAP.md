# Mapa de módulos de Venezia One

> Generado automáticamente con `node scripts/check-module-scope.js --mapa`.
> No lo edites a mano: si cambia el código, vuelve a generarlo.

Cada función de `app.js` pertenece al módulo (o módulos) que la usan de verdad.
Una función **compartida** afecta a varios módulos: tocarla requiere autorización del CEO.

## Archivos por módulo

| Archivo | Módulo |
|---|---|
| `mi-venezia-v2.*` | Mi Venezia V2 (portal de alumna, independiente) |
| `docente-portal-content.js` | Portal docente (temario, actividades, misión) |
| `web-venezia.css` | Web Venezia |
| `dataService.js`, `supabase.js` | Datos compartidos — siempre requiere autorización |
| `app.js`, `index.html`, `style.css` | Varios módulos — se revisa función por función |

## Funciones propias de cada módulo (cambiarlas solo afecta a ese módulo)

### Estructura general (login, menú, navegación) (`shell`) — 8

`applyBranchRestrictionsToUI`, `closePublicAccessPanel`, `initApp`, `mountTeacherPortalShell`, `refreshSharedSupabaseState`, `renderAll`, `setActiveModule`, `updateSessionUI`

### Selector de accesos (`selector-accesos`) — 2

`enterSelectedPlatform`, `renderAccessSelector`

### Dashboard (`dashboard`) — 1

`getDashboardFinanceRecords`

### CRM Prospectos (`crm`) — 22

`BECA_SITE_URL`, `buildBecaConfirmationMessage`, `deleteProspect`, `editProspect`, `getBecaPaseUrl`, `getFormData`, `getProspectHistorySummary`, `markBecaConfirmationSent`, `normalizeLeadChannel`, `normalizeLeadOrigin`, `openBecaConfirmation`, `openWhatsApp`, `removeBecaNotesSegment`, `reopenBecaConfirmation`, `reopenBecaConfirmationFlag`, `resetForm`, `shouldAutoAssignFollowup`, `syncProspectFollowupField`, `toggleCrmQuickFilter`, `updateProspectQuickState`, `upsertBecaNotesSegment`, `viewProspectHistory`

### Altas (`altas`) — 21

`buildAltaInscriptionFinanceRecord`, `buildAltaInscriptionFinanceReference`, `deleteStudentRecord`, `finalizeAltaSubmission`, `getAltaInscriptionLinkedRecords`, `getAltaValidationErrors`, `getDefaultStudentPassword`, `getPendingAltas`, `handleAltaScheduleFieldChange`, `invalidateAltaInscriptionRecordsForStudent`, `openAltaConfirmation`, `prospectAlreadyHasAlta`, `renderAltaConfirmation`, `renderPendingAltas`, `resetAltaForm`, `saveStudentAccessRecords`, `showAltaValidation`, `syncAltaChecklistFromDocumentationStatus`, `syncAltaDocumentStatusFromChecklist`, `syncAltaInscriptionFinanceDelta`, `syncStudentAccessRecords`

### Asistencias (`asistencias`) — 24

`areStudentDocumentListsEqual`, `buildAttendanceNotes`, `captureAttendanceContinuitySnapshot`, `captureAttendanceFormSnapshot`, `completeStudentCourseFromAttendance`, `deleteAttendanceForStudent`, `dropStudentFromAttendance`, `fetchRemoteAttendanceRecordsByStudentDates`, `getAttendanceLogicalKey`, `getVisibleAttendanceRecordsForStudent`, `isDuplicateKeySupabaseError`, `mapRemoteAttendanceRecord`, `mergeAttendanceRecordForSync`, `mergeAttendanceRecordIntoMemory`, `populateAttendanceFilters`, `reactivateStudentAttendanceFromGraduates`, `renderAttendanceHistory`, `resolveAttendanceDropStatus`, `saveAttendanceForStudent`, `saveAttendanceRecord`, `selectedAttendanceStudentId`, `setAttendancePendingStartQuickFilter`, `setAttendanceSaveUiState`, `setAttendanceScheduleQuickFilter`

### Docentes (administración) (`docentes-admin`) — 66

`buildTeacherPaymentPeriodLabel`, `buildTeacherSelectOptions`, `buildTeacherStaffOptions`, `canViewTeacherHistoryAndSummary`, `consolidateTeacherAttendanceGroup`, `deleteDirectorAvisoRecord`, `doesTeacherPaymentMatchRange`, `editTeacherAttendanceRecord`, `editTeacherRecord`, `findMatchingStaffForTeacherRecord`, `getConsolidatedTeacherAttendanceEntries`, `getEligibleTeacherStaffRecords`, `getFilteredTeacherPaymentRecords`, `getFilteredTeacherSummaryEntries`, `getLatestTeacherObservation`, `getSelectableTeacherProfiles`, `getTeacherAttendanceFormData`, `getTeacherAttendanceLogicalKey`, `getTeacherAutoPaymentAmountForForm`, `getTeacherConfigTimestamp`, `getTeacherCoverageDisplay`, `getTeacherCoveredTurnUnits`, `getTeacherEstimatedPay`, `getTeacherFormData`, `getTeacherPeriodRange`, `getTeacherShiftPriority`, `getTeacherSpecialtyDisplay`, `getTeacherSpecialtyKey`, `getTeacherSummaryDefaultRange`, `getTeacherSummaryRange`, `getTeacherSummaryRows`, `getVisibleTeacherRecords`, `handleDirectorAvisoDeleteClick`, `handleDirectorAvisoSubmit`, `isCoordinatorTeacherStaff`, `isTeacherDateWithinRange`, `normalizeTeacherAttendanceStatus`, `normalizeTeacherDataAgainstStaff`, `normalizeTeacherShift`, `populateTeacherConfigStaffOptions`, `populateTeacherPaymentSelects`, `populateTeacherSelects`, `renderDirectorAvisosAdminTable`, `renderTeacherAttendanceTable`, `renderTeacherPaymentsTable`, `renderTeacherSummaryTable`, `renderTeachersModule`, `renderTeachersTable`, `resetTeacherAttendanceForm`, `resetTeacherForm`, `resetTeacherPaymentForm`, `resolveTeacherShiftForPayroll`, `saveDirectorAvisoRecord`, `saveTeacherAttendanceCollection`, `saveTeacherAttendanceRecord`, `saveTeacherPaymentsCollection`, `saveTeacherRecord`, `saveTeachersCollection`, `syncTeacherAttendanceFields`, `syncTeacherConfigFields`, `syncTeacherPaymentFields`, `syncTeacherSummaryDateRangeFromMonth`, `teacherAttendanceRecords`, `teacherPaymentRecords`, `updateTeacherAttendanceHelper`, `updateTeacherModuleStats`

### Pagos (`pagos`) — 130

`CERTIFICATE_PAYMENT_EXPECTED_AMOUNTS`, `LATE_FEE_DAILY_AMOUNT`, `LATE_FEE_GRACE_CUTOFF_HOUR`, `PAYMENT_COMPARISON_STUDENT_NAMES`, `PAYMENT_CONCEPT_FIELD_KEYS`, `PAYMENT_EDITABLE_FIELDS`, `PAYMENT_METHOD_OPTIONS`, `PAYMENT_STATUS_OPTIONS`, `PAYMENT_TRACE_STUDENT_NAMES`, `activePaymentsSearch`, `addLocalDaysToDateKey`, `applyPaymentConceptDetailToEditableControls`, `buildIncompletePaymentReviewEntry`, `buildOverduePaymentReviewEntries`, `buildPaymentConceptFinanceRecord`, `buildPaymentFinanceRecord`, `buildPaymentFinanceReference`, `buildPaymentNotes`, `buildPaymentSupabasePayload`, `buildPaymentSupabaseTrace`, `buildStudentLifecyclePatch`, `buildVisiblePaymentConsoleTrace`, `capturePaymentFormSnapshot`, `changeStudentAttendanceStatusFromPayments`, `createPaymentUuid`, `deleteLinkedPaymentFinanceRecords`, `deletePaymentForStudent`, `focusPaymentReviewStudent`, `formatLateFeeSummaryTitle`, `formatUpcomingWeekendRange`, `getActiveStudents`, `getArchivedNoContinuationStudents`, `getCanonicalPaymentRecord`, `getCanonicalPaymentRecordForStudent`, `getCanonicalStudentsForPayments`, `getCurrentMexicoDateTimeParts`, `getEditedPaidPaymentConceptsFromForm`, `getExistingPaymentRowForSave`, `getFilteredStudentsForPayments`, `getLastInteractedPaidPaymentConceptFromForm`, `getLateFeeDaysForDueDate`, `getLatestPaymentSortKey`, `getLinkedPaymentFinanceRecords`, `getLocalWeekdayIndex`, `getPaymentAmountValidationError`, `getPaymentAutoSyncStudentName`, `getPaymentConceptDefinitionByKey`, `getPaymentConceptDetailsByKey`, `getPaymentConceptsForSave`, `getPaymentContinuityFollowupDisplay`, `getPaymentContinuitySelection`, `getPaymentFieldChanges`, `getPaymentLastMonthlySelection`, `getPaymentNextCourseSelection`, `getPaymentNextCourseStartDateValue`, `getPaymentPersistenceMismatches`, `getPaymentRealDateInputValue`, `getPaymentReviewConceptLabel`, `getPaymentReviewConceptRules`, `getPaymentReviewPaidStatusDisplay`, `getPaymentReviewRecordConcept`, `getPaymentsCollectionLifecycleSummary`, `getPaymentsLateFeeOverview`, `getPaymentsReviewEntries`, `getPaymentsTableRowByStudentId`, `getPendingPaymentConceptsUpTo`, `getPreferredPaymentsMonth`, `getReconciledPersistentPaymentRecord`, `getScopedPaymentRecords`, `getShortBranchLabel`, `getStudentAttendanceStatusInfo`, `getStudentInscriptionDate`, `getStudentLateFeeSummary`, `getStudentPaymentLateFeeSummary`, `getStudentPaymentReferenceByField`, `getStudentsPendingContinuityFollowup`, `getTrackedPaymentSnapshots`, `getTuesdayForOperationalCollectionWeek`, `getUpcomingPaymentAmount`, `getUpcomingPaymentsForWeekendWindow`, `getUpcomingWeekendPaymentWindows`, `handlePaymentConceptFieldFocus`, `handlePaymentFieldChange`, `hasEditedPaymentCaptureFields`, `hasLaterMarkedPaymentConcept`, `hasPaymentControlChanged`, `hasUnsavedPaymentTableChanges`, `highlightPaymentsTableRow`, `isNoApplyPaymentStatus`, `isPaymentConceptFinanceRecord`, `isSamePaymentFinanceRecord`, `isStudentActiveForPaymentReview`, `paymentComparisonSnapshots`, `paymentLastInteractedConceptByStudentId`, `paymentSaveStudentIds`, `paymentsLateFeeOnlyFilter`, `paymentsMonthWasManuallySelected`, `paymentsReviewHighlightTimer`, `paymentsTableExpanded`, `refreshPaymentsAfterAttendanceStatusChange`, `registerPaymentComparisonTrace`, `rememberPaymentConceptInteraction`, `renderPaymentReviewRiskBadge`, `renderPaymentSelectOptions`, `renderPaymentStatusSelect`, `renderPaymentsLifecyclePanels`, `renderPaymentsReviewPanel`, `renderPaymentsSyncPendingBanner`, `renderPaymentsTable`, `renderPaymentsUpcomingEntryRow`, `renderStudentAttendanceStatusBadge`, `resolvePaymentsAttendanceStatusChange`, `savePaymentForStudent`, `savePaymentRecord`, `setPaymentEditableControlFromConceptDetail`, `setPaymentSaveUiState`, `summarizeFinanceConceptResultForDebug`, `summarizePaymentConceptsForDebug`, `summarizePaymentEligibilityForTrace`, `summarizePaymentRecordForTrace`, `summarizePaymentRenderSourcesForDebug`, `summarizePaymentSaveDebugRecord`, `syncChangedPaymentConceptFinanceRecords`, `syncPaymentConceptFinanceRecord`, `syncPaymentFinanceRecord`, `syncPreferredPaymentsMonth`, `syncStudentLifecycleFromPaymentRecord`, `toNullablePaymentNumber`, `updatePaymentControlEditedState`, `updatePaymentsSummary`

### Balance (`balance`) — 13

`buildBalanceExpenseDetails`, `buildBalanceExpenseFinanceRecord`, `deleteBalanceExpense`, `deleteBalanceExpenseRecord`, `editBalanceExpense`, `getBalanceExpenseFinanceRecordByExpenseId`, `getBalanceExpenseFormData`, `getBalanceExpenseRecordById`, `getBalanceExpenseValidationErrors`, `resetBalanceExpenseForm`, `saveBalanceExpenseRecord`, `saveBalanceExpensesCollection`, `syncBalanceExpenseTotal`

### Finanzas (`finanzas`) — 7

`EXPENSE_CATEGORIES`, `INCOME_CATEGORIES`, `deleteFinanceRecord`, `editFinanceRecord`, `getFinanceFormData`, `resetFinanceForm`, `updateFinanceCategories`

### Usuarios y accesos (`usuarios`) — 8

`deleteInternalUser`, `editInternalUser`, `getInternalUserFormData`, `getVisibleInternalUsers`, `removeInternalUserPermissionOverride`, `renderInternalUsersTable`, `resetInternalUserForm`, `toggleInternalUserState`

### Personal (`personal`) — 18

`DIRECTOR_CONTACT_SCOPE_OPTIONS`, `buildStaffTemporaryPassword`, `deleteStaffRecord`, `editStaffRecord`, `generateStaffUsername`, `getDirectorContactScopeLabel`, `getStaffAccessLabel`, `getStaffBirthYear`, `getStaffBranchPrefix`, `getStaffFormData`, `getStaffRoleFromPosition`, `getVisibleStaffRecords`, `renderStaffTable`, `resetStaffForm`, `saveStaffRecord`, `slugifyStaffUsername`, `syncStaffAccessFields`, `syncStaffInternalAccess`

### Mi Venezia (dentro del sistema interno) (`mi-venezia-legacy`) — 16

`bindStudentAvatarImage`, `cloneSerializable`, `focusMiVeneziaLoginField`, `getPasswordChangeValidationError`, `handleMiVeneziaContratoConfirmation`, `handleMiVeneziaGlobalRuntimeError`, `handleMiVeneziaPasswordChange`, `handleMiVeneziaReglamentoConfirmation`, `handleMiVeneziaViewNavigation`, `logoutMiVenezia`, `openMiVeneziaView`, `restoreCollectionFromSnapshot`, `revealMiVeneziaLoginPanel`, `saveStudentPortalAccessRecord`, `setMiVeneziaView`, `validateSupabasePassword`

### Portal docente (`portal-docente`) — 22

`TEACHER_PORTAL_DAY_ORDER`, `capitalizeFirstLetter`, `closeTeacherPortalActividades`, `closeTeacherPortalGrupos`, `closeTeacherPortalTemario`, `compareTeacherPortalGrupos`, `formatTeacherPortalHeroName`, `getTeacherPortalDayRank`, `getTeacherPortalGrupos`, `getTeacherPortalHorarioStartMinutes`, `getTeacherProfileByInternalUser`, `openTeacherPortalActividades`, `openTeacherPortalGrupos`, `openTeacherPortalModal`, `openTeacherPortalTemario`, `renderTeacherPortalDashboard`, `renderTeacherPortalGruposLauncher`, `renderTeacherPortalGruposView`, `renderTeacherPortalStaticContent`, `renderTeacherPortalTemarioLauncher`, `renderTeacherPortalTemarioView`, `renderTeacherPortalTemarioWatermark`

### Web Venezia (`web-venezia`) — 9

`WEB_DEFAULT_COURSES`, `copyStudentFileValue`, `getWebCourseCatalog`, `getWebOpenCourseCatalog`, `getWebWhatsAppUrl`, `renderWebCourseAvailability`, `renderWebCourses`, `renderWebScholarshipSection`, `renderWebWhatsappLinks`

## Funciones compartidas — 582 (tocar = pedir autorización)

| Función | Módulos que la usan |
|---|---|
| `__veneziaGet` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `currentInternalUserId` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `dataService` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `escapeHtml` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `internalUsers` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `moduleSections` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `staffRecords` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `stripDiacritics` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `getCurrentInternalUser` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `getLinkedTeacherConfigForUser` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `getLinkedTeacherStaffRecordForUser` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `getTeacherStaffAccessUsername` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `isEligibleTeacherStaffPosition` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `isTeacherInternalUser` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `isTeacherRoleLabel` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `normalizeInternalLookupValue` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `normalizeTeacherPosition` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `students` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, portal-docente, shell, usuarios, web-venezia |
| `TEACHER_ACCESS_ROLE_LABELS` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `TEACHER_ELIGIBLE_POSITION_FRAGMENTS` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `TEACHER_ELIGIBLE_POSITIONS` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `teacherRecords` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `formatDateForInput` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, portal-docente, shell, web-venezia |
| `ACTIVE_SYSTEM_BRANCHES` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, shell, usuarios, web-venezia |
| `financeRecords` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, shell, usuarios, web-venezia |
| `getActiveSystemBranches` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, shell, usuarios, web-venezia |
| `isActiveSystemBranch` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, shell, usuarios, web-venezia |
| `normalizeLooseText` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, personal, portal-docente, shell, web-venezia |
| `normalizeSystemBranch` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, shell, usuarios, web-venezia |
| `__veneziaCoalesce` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `addDaysToDateValue` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `alignDateToSelectedClassDay` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `ATTENDANCE_COURSE_COMPLETED_STATUS` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `ATTENDANCE_DROPPED_STATUSES` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `attendanceRecords` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `BARBERIA_COURSE_SESSION_COUNT` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `BRANCH_LIMITED_ROLES` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, shell, usuarios |
| `createMiVeneziaCompatibleId` | altas, asistencias, balance, crm, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, usuarios, web-venezia |
| `createMiVeneziaFallbackId` | altas, asistencias, balance, crm, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, usuarios, web-venezia |
| `DEFAULT_ATTENDANCE_SESSION_COUNT` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `EXTENDED_DURATION_CUTOFF_DATE` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `EXTENDED_DURATION_STUDENT_NAMES` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `getAllowedBranch` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, shell, usuarios |
| `getAttendanceSessionDates` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `getAttendanceSessionGroups` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `getAttendanceWeekdayIndex` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `getCurrentMexicoDateValue` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `getCurrentMonthValue` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `getExtendedAttendanceSessionCountForCourse` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `getLegacyAttendanceSessionCountForCourse` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `getStudentAttendanceBaseDate` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `getStudentAttendanceSessionGroups` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `getStudentCourseStartDateValue` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `getStudentExpectedSessionCount` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `getStudentStartDateValue` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `getStudentStatus` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `isAllBranchesScope` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, shell, usuarios |
| `isExtendedDurationStudent` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `isPendingStartStudent` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `isRoleBranchLimited` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, shell, usuarios |
| `isStudentCourseCompleted` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `isStudentDeleted` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `isStudentDropped` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `isStudentExcludedFromDurationExtension` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `isStudentInactiveForAttendance` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `LEGACY_BARBERIA_SESSION_COUNT` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `MARTES_MIERCOLES_ATTENDANCE_DAYS` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `matchesCurrentBranch` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, shell, usuarios |
| `MULTI_DAY_ATTENDANCE_SCHEDULES` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `normalizeAttendanceDayLabel` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `normalizeLifecycleStatus` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `normalizeLocalDateKey` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `parseLocalDateKey` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `prospects` | altas, asistencias, balance, crm, docentes-admin, finanzas, pagos, personal, shell, usuarios, web-venezia |
| `selectedMonth` | altas, asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `STANDARD_COURSE_SESSION_COUNT` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `STUDENT_LIFECYCLE_STATUS` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `studentUsesExtendedDuration` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `WEEKDAY_ATTENDANCE_DAYS` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, portal-docente, shell, web-venezia |
| `balanceExpenses` | altas, balance, crm, dashboard, docentes-admin, finanzas, pagos, personal, shell, usuarios |
| `courseUsesFifthMonth` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `courseUsesSixthMonth` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `createEmptyPaymentRecord` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `getPaymentRecordMonth` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `getPaymentRecordsForStudentIdentity` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `getPaymentStudentAliasIds` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `getPaymentStudentIdentityKey` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `getStudentAttendanceReferenceSessions` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `isPaymentReferenceRuleApplicableForStudent` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `normalizePaymentStatusForCourseRule` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `parsePaymentAmount` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `paymentRecords` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `scrollWindowToTopCompat` | altas, asistencias, balance, crm, docentes-admin, finanzas, mi-venezia-legacy, pagos, personal, usuarios |
| `selectedPaymentsMonth` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `STUDENT_PAYMENT_REFERENCE_RULES` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `studentUsesFifthMonth` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `studentUsesSixthMonth` | altas, asistencias, balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell, web-venezia |
| `formatDisplayDate` | asistencias, balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, shell |
| `normalizePhone` | altas, asistencias, balance, crm, mi-venezia-legacy, pagos, personal, shell, web-venezia |
| `applyPaymentConceptDetailsToPaymentRecord` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `BALANCE_PAYMENT_CONCEPT_FIELDS` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `buildPaymentConceptFinanceReference` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `buildPaymentEditableRecord` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `formatCurrency` | balance, crm, dashboard, docentes-admin, finanzas, mi-venezia-legacy, pagos, shell |
| `getCourseMonthlyPaymentFields` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getFinalMonthlyPaymentField` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaidPaymentConcepts` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaymentConceptDetailFromLegacy` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaymentConceptDetailFromSpecificFinance` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaymentConceptDetailLegacyAmount` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaymentConceptDetails` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaymentConceptFinanceRecords` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaymentConceptKeyFromFinanceRecord` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaymentDisplayRecord` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaymentFinanceCategoryFromConcept` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaymentFinanceReferenceParts` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaymentRecordForDisplay` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPaymentStatusForCourseField` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getPersistentPaymentRecord` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getStudentCollectionLifecycle` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getStudentPaymentReferenceDateByField` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `getStudentPaymentReferenceRule` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `hasStudentPendingMonthlyPayments` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `isEligiblePaymentStatus` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `isLastMonthlyPaymentSettled` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `isMonthlyPaymentCovered` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `NEXT_COURSE_OPTIONS` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `normalizeContinuityStatus` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `normalizeLastMonthlyPaymentStatus` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `normalizeNextCourse` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `normalizePaymentConceptText` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `normalizePaymentMovementConcept` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `PAYMENT_CONCEPT_DETAIL_FIELDS` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `PAYMENT_FINANCE_ELIGIBLE_STATUSES` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `PAYMENT_FINANCE_REFERENCE_PREFIX` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `resolvePaymentSaveMonth` | altas, asistencias, balance, dashboard, finanzas, pagos, shell, web-venezia |
| `resolveSystemBranchForSave` | altas, asistencias, balance, crm, finanzas, pagos, personal, usuarios |
| `currentAccessMode` | crm, mi-venezia-legacy, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `currentPortalStudentId` | altas, crm, mi-venezia-legacy, portal-docente, selector-accesos, shell, usuarios |
| `getHistoricalSystemBranches` | altas, balance, crm, docentes-admin, finanzas, personal, usuarios |
| `getLatestPaymentRecordForStudent` | altas, asistencias, balance, crm, mi-venezia-legacy, pagos, web-venezia |
| `getLegacyPaymentRealDateFallback` | balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell |
| `getLinkedPaymentFinanceRecordDate` | balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell |
| `getLocalDateValueFromTimestamp` | altas, asistencias, balance, crm, pagos, shell, web-venezia |
| `getMexicoDateValueFromStoredDateTime` | balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell |
| `getMonthStartEnd` | altas, balance, crm, dashboard, finanzas, pagos, shell |
| `getPaymentEffectiveDate` | balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell |
| `getPaymentTone` | altas, asistencias, balance, crm, mi-venezia-legacy, pagos, web-venezia |
| `getStoredPaymentRealDate` | balance, crm, dashboard, finanzas, mi-venezia-legacy, pagos, shell |
| `getStudentAltaCreatedDate` | altas, asistencias, balance, crm, pagos, shell, web-venezia |
| `getStudentById` | altas, asistencias, balance, crm, mi-venezia-legacy, pagos, web-venezia |
| `getStudentFileBadgeClass` | altas, asistencias, balance, crm, mi-venezia-legacy, pagos, web-venezia |
| `getWhatsAppUrlByPhone` | altas, asistencias, balance, crm, pagos, shell, web-venezia |
| `isDateInMonth` | altas, balance, crm, dashboard, finanzas, pagos, shell |
| `isHistoricalSystemBranch` | altas, balance, crm, docentes-admin, finanzas, personal, usuarios |
| `isSystemBranchAllowedForSave` | altas, balance, crm, docentes-admin, finanzas, personal, usuarios |
| `matchesOperationalSystemBranch` | asistencias, balance, dashboard, docentes-admin, finanzas, pagos, shell |
| `normalizeWhatsAppPhoneNumber` | altas, asistencias, balance, crm, pagos, shell, web-venezia |
| `renderStudentFileBadge` | altas, asistencias, balance, crm, mi-venezia-legacy, pagos, web-venezia |
| `renderStudentFileInfoList` | altas, asistencias, balance, crm, mi-venezia-legacy, pagos, web-venezia |
| `setPortalPasswordFeedback` | crm, docentes-admin, mi-venezia-legacy, portal-docente, selector-accesos, shell, usuarios |
| `ALTA_FINANCE_SOURCE` | altas, balance, dashboard, finanzas, pagos, shell |
| `ALTA_INSCRIPTION_CONCEPT_KEY` | altas, balance, dashboard, finanzas, pagos, shell |
| `ALTA_INSCRIPTION_FINANCE_REFERENCE_PREFIX` | altas, balance, dashboard, finanzas, pagos, shell |
| `formatMonthLabelEs` | altas, balance, dashboard, finanzas, pagos, shell |
| `getStudentDeliveredDocuments` | altas, asistencias, balance, crm, pagos, web-venezia |
| `getStudentDocumentAliasMap` | altas, asistencias, balance, crm, pagos, web-venezia |
| `getStudentDocumentationState` | altas, asistencias, balance, crm, pagos, web-venezia |
| `getStudentDocumentCanonicalMap` | altas, asistencias, balance, crm, pagos, web-venezia |
| `getStudentDocumentKey` | altas, asistencias, balance, crm, pagos, web-venezia |
| `isAltaInscriptionFinanceRecord` | altas, balance, dashboard, finanzas, pagos, shell |
| `isAltaInscriptionRecordCancelled` | altas, balance, dashboard, finanzas, pagos, shell |
| `normalizeStudentDocumentationStatus` | altas, asistencias, balance, crm, pagos, web-venezia |
| `parseStudentDocumentList` | altas, asistencias, balance, crm, pagos, web-venezia |
| `publicAccessPanelOpen` | mi-venezia-legacy, portal-docente, selector-accesos, shell, usuarios, web-venezia |
| `renderInfoList` | balance, crm, finanzas, mi-venezia-legacy, pagos, portal-docente |
| `resetPortalPasswordForm` | crm, mi-venezia-legacy, portal-docente, selector-accesos, shell, usuarios |
| `resolveStudentDocumentNames` | altas, asistencias, balance, crm, pagos, web-venezia |
| `STUDENT_DOCUMENT_REQUIREMENTS` | altas, asistencias, balance, crm, pagos, web-venezia |
| `activeModule` | asistencias, mi-venezia-legacy, pagos, shell, web-venezia |
| `activeStudentFileId` | altas, asistencias, balance, pagos, web-venezia |
| `ATTENDANCE_STATUS_LABELS` | asistencias, crm, mi-venezia-legacy, pagos, portal-docente |
| `BALANCE_EXPENSE_CONCEPT_KEY` | balance, dashboard, finanzas, pagos, shell |
| `BALANCE_EXPENSE_FINANCE_REFERENCE_PREFIX` | balance, dashboard, finanzas, pagos, shell |
| `BALANCE_FINANCE_SOURCE` | balance, dashboard, finanzas, pagos, shell |
| `buildBalanceExpenseFinanceReference` | balance, dashboard, finanzas, pagos, shell |
| `buildFinanceSummary` | balance, dashboard, finanzas, pagos, shell |
| `closeStudentFile` | altas, asistencias, balance, pagos, web-venezia |
| `closeTeacherPortalModals` | mi-venezia-legacy, portal-docente, selector-accesos, shell, usuarios |
| `CONTINUITY_STATUS_OPTIONS` | altas, asistencias, balance, pagos, web-venezia |
| `DASHBOARD_BRANCHES` | balance, dashboard, finanzas, pagos, shell |
| `dashboardInscriptionScope` | balance, dashboard, finanzas, pagos, shell |
| `dashboardSelectedMonth` | balance, dashboard, finanzas, pagos, shell |
| `getAttendanceMeta` | altas, asistencias, balance, pagos, web-venezia |
| `getAttendanceNotesValue` | altas, asistencias, balance, pagos, web-venezia |
| `getBalanceExpenseIdFromFinanceReference` | balance, dashboard, finanzas, pagos, shell |
| `getCentralFinanceRecords` | balance, dashboard, finanzas, pagos, shell |
| `getChangedPaidPaymentConcepts` | balance, dashboard, finanzas, pagos, shell |
| `getChangedPaymentMovementConcepts` | balance, dashboard, finanzas, pagos, shell |
| `getContinuityStatusLabel` | altas, asistencias, balance, pagos, web-venezia |
| `getCurrentFinanceYearRange` | balance, dashboard, finanzas, pagos, shell |
| `getDashboardCollectionLifecycleSummary` | balance, dashboard, finanzas, pagos, shell |
| `getDashboardFinanceRecordIdentity` | balance, dashboard, finanzas, pagos, shell |
| `getDashboardFinanceSnapshotRecords` | balance, dashboard, finanzas, pagos, shell |
| `getDashboardInscriptionAnchorDate` | balance, dashboard, finanzas, pagos, shell |
| `getDashboardInscriptionIncomeSummary` | balance, dashboard, finanzas, pagos, shell |
| `getDashboardOperationalInscriptionRecords` | balance, dashboard, finanzas, pagos, shell |
| `getDashboardScopedStudents` | balance, dashboard, finanzas, pagos, shell |
| `getDashboardSelectedMonthValue` | balance, dashboard, finanzas, pagos, shell |
| `getDerivedFinanceExpenseRecords` | balance, dashboard, finanzas, pagos, shell |
| `getDerivedFinanceIncomeRecords` | balance, dashboard, finanzas, pagos, shell |
| `getExecutiveFinanceSnapshot` | balance, dashboard, finanzas, pagos, shell |
| `getFinanceRecordsForScope` | balance, dashboard, finanzas, pagos, shell |
| `getLatestAttendanceMetadataRecord` | altas, asistencias, balance, pagos, web-venezia |
| `getOperationalInscriptionRecords` | balance, dashboard, finanzas, pagos, shell |
| `getPaymentFinanceCategory` | balance, dashboard, finanzas, pagos, shell |
| `getPaymentMovementConceptLabels` | balance, dashboard, finanzas, pagos, shell |
| `getSafeStoredPaymentConcept` | balance, dashboard, finanzas, pagos, shell |
| `getSingleActiveBranchForOperationalScope` | balance, dashboard, finanzas, pagos, shell |
| `getStudentWhatsAppUrl` | altas, asistencias, balance, pagos, web-venezia |
| `getTeacherPortalModalViews` | mi-venezia-legacy, portal-docente, selector-accesos, shell, usuarios |
| `getWeekRangeForDate` | balance, dashboard, finanzas, pagos, shell |
| `isAccumulatedPaymentConcept` | balance, dashboard, finanzas, pagos, shell |
| `isAnyTeacherPortalModalOpen` | mi-venezia-legacy, portal-docente, selector-accesos, shell, usuarios |
| `isBalanceExpenseFinanceRecord` | balance, dashboard, finanzas, pagos, shell |
| `isOperationalInscriptionRecordActive` | balance, dashboard, finanzas, pagos, shell |
| `isPaymentEligibleForFinanceRecord` | balance, dashboard, finanzas, pagos, shell |
| `isRealPaidPaymentRecord` | balance, dashboard, finanzas, pagos, shell |
| `isTeacherPortalModalOpen` | mi-venezia-legacy, portal-docente, selector-accesos, shell, usuarios |
| `isWeekdayAttendanceDay` | asistencias, crm, mi-venezia-legacy, pagos, portal-docente |
| `isWeekdayStudent` | asistencias, crm, mi-venezia-legacy, pagos, portal-docente |
| `logoutInternalSession` | mi-venezia-legacy, portal-docente, selector-accesos, shell, usuarios |
| `mapAltaInscriptionFinanceRecord` | balance, dashboard, finanzas, pagos, shell |
| `mapBalanceExpenseFinanceRecord` | balance, dashboard, finanzas, pagos, shell |
| `mapLinkedPaymentFinanceRecord` | balance, dashboard, finanzas, pagos, shell |
| `matchesDashboardBranch` | balance, dashboard, finanzas, pagos, shell |
| `parseBalanceExpenseDetails` | balance, dashboard, finanzas, pagos, shell |
| `populateDashboardBranchFilter` | balance, dashboard, finanzas, pagos, shell |
| `populateDashboardMonthFilter` | balance, dashboard, finanzas, pagos, shell |
| `populateSelectWithValues` | balance, dashboard, finanzas, pagos, shell |
| `renderDashboard` | balance, dashboard, finanzas, pagos, shell |
| `renderDashboardFinanceComparison` | balance, dashboard, finanzas, pagos, shell |
| `renderDashboardInscriptionIncome` | balance, dashboard, finanzas, pagos, shell |
| `renderStudentFile` | altas, asistencias, balance, pagos, web-venezia |
| `resolvePaymentMovementConcept` | balance, dashboard, finanzas, pagos, shell |
| `summarizeFinancialRecords` | balance, dashboard, finanzas, pagos, shell |
| `summarizeStudentCollectionLifecycle` | balance, dashboard, finanzas, pagos, shell |
| `syncDashboardInscriptionScopeButtons` | balance, dashboard, finanzas, pagos, shell |
| `teacherPortalModalReturnFocus` | mi-venezia-legacy, portal-docente, selector-accesos, shell, usuarios |
| `ALTA_ACCESO_OPTIONS` | altas, asistencias, crm, pagos |
| `ALTA_COURSE_CATALOG` | altas, asistencias, crm, pagos |
| `ALTA_HORARIO_OPTIONS_BARBERIA` | altas, asistencias, crm, pagos |
| `ALTA_HORARIO_OPTIONS_DEFAULT` | altas, asistencias, crm, pagos |
| `ALTA_HORARIO_OPTIONS_MARTES_MIERCOLES` | altas, asistencias, crm, pagos |
| `ALTA_INSCRIPTION_CONCEPT_LABEL` | altas, balance, finanzas, pagos |
| `ALTA_SCHEDULE_BARBERIA` | altas, asistencias, crm, pagos |
| `ALTA_SCHEDULE_UNAS_PESTANAS` | altas, asistencias, crm, pagos |
| `buildStudentPortalPassword` | altas, asistencias, crm, pagos |
| `classifyAltaScheduleType` | altas, crm, mi-venezia-legacy, shell |
| `clearAltaValidation` | altas, asistencias, crm, pagos |
| `closeAltaConfirmation` | altas, asistencias, crm, pagos |
| `generateStudentCode` | altas, asistencias, crm, pagos |
| `getAgeFromBirthDate` | altas, asistencias, crm, pagos |
| `getAltaCourseEntry` | altas, asistencias, crm, pagos |
| `getAltaCursoDisplayName` | altas, asistencias, crm, pagos |
| `getAltaDiaClasesOptionsForCurso` | altas, asistencias, crm, pagos |
| `getAltaHorarioOptionsForCurso` | altas, asistencias, crm, pagos |
| `getAltaSummaryData` | altas, asistencias, crm, pagos |
| `getBirthYear` | altas, asistencias, crm, pagos |
| `getInternalUserPermissionOverrides` | personal, shell, usuarios, web-venezia |
| `getPaymentReferenceShortLabel` | asistencias, crm, mi-venezia-legacy, pagos |
| `getStudentAttendanceSessionDates` | asistencias, crm, mi-venezia-legacy, portal-docente |
| `getVeneziaVisibleUiLabel` | mi-venezia-legacy, portal-docente, shell, web-venezia |
| `hasInternalAccess` | selector-accesos, shell, usuarios, web-venezia |
| `hasModuleAccessForUser` | selector-accesos, shell, usuarios, web-venezia |
| `INTERNAL_USER_PERMISSIONS_STORAGE_KEY` | personal, shell, usuarios, web-venezia |
| `isStudentCourseCompletedForAttendance` | asistencias, pagos, portal-docente, shell |
| `isStudentMinorByBirthDate` | altas, asistencias, crm, pagos |
| `isVeneziaElementVisible` | mi-venezia-legacy, portal-docente, shell, web-venezia |
| `normalizeAdvisorName` | altas, asistencias, crm, pagos |
| `normalizeContinuitySelection` | altas, asistencias, pagos, shell |
| `openStudentFile` | altas, asistencias, balance, pagos |
| `pendingAltaConfirmation` | altas, asistencias, crm, pagos |
| `renderAltaDocumentChecklist` | altas, asistencias, crm, pagos |
| `renderAltaSelectOptions` | altas, asistencias, crm, pagos |
| `renderAltaSummary` | altas, asistencias, crm, pagos |
| `renderStudentDocumentCheckboxList` | altas, asistencias, crm, pagos |
| `saveFinanceRecord` | altas, balance, finanzas, pagos |
| `saveInternalUserPermissionOverrides` | personal, shell, usuarios, web-venezia |
| `saveStudentRecord` | altas, asistencias, mi-venezia-legacy, pagos |
| `setInternalUserPermissionOverride` | personal, shell, usuarios, web-venezia |
| `syncAltaAutoFields` | altas, asistencias, crm, pagos |
| `syncAltaDateDisplay` | altas, asistencias, crm, pagos |
| `toTeacherFacingLabel` | docentes-admin, personal, portal-docente, usuarios |
| `updateAltaAccesoOptions` | altas, asistencias, crm, pagos |
| `updateAltaCursoOptions` | altas, asistencias, crm, pagos |
| `updateAltaDiaClasesOptions` | altas, asistencias, crm, pagos |
| `updateAltaElectorFieldLabel` | altas, asistencias, crm, pagos |
| `updateAltaHorarioOptions` | altas, asistencias, crm, pagos |
| `activeAttendanceQuickFilter` | asistencias, pagos, shell |
| `activeAttendanceSearch` | asistencias, pagos, shell |
| `ALL_MODULE_PERMISSIONS` | shell, usuarios, web-venezia |
| `balanceDateWasManuallySelected` | balance, finanzas, pagos |
| `BASE_ROLE_PERMISSIONS` | personal, shell, web-venezia |
| `buildStudentPaymentReferenceEntry` | crm, mi-venezia-legacy, pagos |
| `compareAttendanceScheduleSummaryItems` | asistencias, pagos, shell |
| `getAltaFormData` | altas, asistencias, pagos |
| `getAttendanceBaseStudentsForActiveFilter` | asistencias, pagos, shell |
| `getAttendanceBranchesByCourse` | asistencias, pagos, shell |
| `getAttendanceCourseSummaryItems` | asistencias, pagos, shell |
| `getAttendanceScheduleDayDisplay` | asistencias, pagos, shell |
| `getAttendanceScheduleDaySortValue` | asistencias, pagos, shell |
| `getAttendanceScheduleFilterStudents` | asistencias, pagos, shell |
| `getAttendanceScopedStudents` | asistencias, pagos, shell |
| `getAttendanceStartedSummaryStudents` | asistencias, pagos, shell |
| `getAttendanceStudentScheduleSummary` | asistencias, pagos, shell |
| `getAttendanceUpcomingStartStudents` | asistencias, pagos, shell |
| `getBalanceIncomeRows` | balance, finanzas, pagos |
| `getBalanceInscriptionRows` | balance, finanzas, pagos |
| `getBalanceMethodBucket` | balance, finanzas, pagos |
| `getBalancePaymentConceptDisplay` | balance, finanzas, pagos |
| `getBalanceResponsibleCandidates` | balance, finanzas, pagos |
| `getBalanceResponsibleSuggestion` | balance, finanzas, pagos |
| `getCheckedDocumentNames` | altas, asistencias, pagos |
| `getDefaultModuleForCurrentContext` | shell, usuarios, web-venezia |
| `getFilteredBalanceExpenses` | balance, finanzas, pagos |
| `getFilteredFinanceRecords` | balance, finanzas, pagos |
| `getFilteredStudentsForAttendance` | asistencias, pagos, shell |
| `getMiVeneziaAttendanceOverview` | crm, mi-venezia-legacy, portal-docente |
| `getPaymentRecord` | crm, mi-venezia-legacy, pagos |
| `getPlatformAccessCards` | selector-accesos, shell, web-venezia |
| `getStudentAttendanceCalendar` | crm, mi-venezia-legacy, portal-docente |
| `getStudentDocumentationSaveState` | altas, asistencias, pagos |
| `getStudentReglamentoStatus` | asistencias, crm, mi-venezia-legacy |
| `getUserInternalPlatformModules` | selector-accesos, shell, web-venezia |
| `hasStudentAttendanceClassRecord` | asistencias, pagos, shell |
| `INTERNAL_PLATFORM_MODULE_ORDER` | selector-accesos, shell, web-venezia |
| `isAttendancePendingStartQuickFilterActive` | asistencias, pagos, shell |
| `isAttendanceScheduleQuickFilterActive` | asistencias, pagos, shell |
| `isEligibleBalanceResponsiblePosition` | balance, finanzas, pagos |
| `isStudentFutureStartForAttendance` | asistencias, pagos, shell |
| `isStudentUpcomingStartForAttendance` | asistencias, pagos, shell |
| `isStudentVisibleInAttendance` | asistencias, pagos, shell |
| `loadStudentIntoAlta` | altas, asistencias, pagos |
| `matchesBalanceDate` | balance, finanzas, pagos |
| `normalizeDirectorContactScope` | crm, mi-venezia-legacy, personal |
| `populateBalanceExpenseResponsibleOptions` | balance, finanzas, pagos |
| `populateFinanceBranchFilter` | balance, finanzas, pagos |
| `populateFinanceVisibleMonthFilter` | balance, finanzas, pagos |
| `renderBalanceExpensesTable` | balance, finanzas, pagos |
| `renderBalanceIncomeTable` | balance, finanzas, pagos |
| `renderBalanceModule` | balance, finanzas, pagos |
| `renderFinanceTable` | balance, finanzas, pagos |
| `saveInternalUsers` | shell, usuarios, web-venezia |
| `saveProspectRecord` | altas, crm, web-venezia |
| `summarizeBalanceMethodTotals` | balance, finanzas, pagos |
| `syncBalanceDailyView` | balance, finanzas, pagos |
| `syncBalanceExpenseResponsible` | balance, finanzas, pagos |
| `updateAttendanceSummary` | asistencias, pagos, shell |
| `updateBalanceSummary` | balance, finanzas, pagos |
| `updateFinanceSummary` | balance, finanzas, pagos |
| `activeAdvisorFilter` | crm, shell |
| `activeAltaPendingFilter` | altas, shell |
| `activeCrmQuickFilter` | crm, shell |
| `activeSearch` | crm, shell |
| `appendMiVeneziaLoginDebug` | crm, mi-venezia-legacy |
| `applyMiVeneziaLoginImmediateFeedback` | crm, mi-venezia-legacy |
| `applyMiVeneziaPortalTheme` | crm, mi-venezia-legacy |
| `applyStudentAvatarDisplay` | crm, mi-venezia-legacy |
| `ATTENDANCE_PRIORITY_PAYMENT_REFERENCE_FIELDS` | asistencias, pagos |
| `ATTENDANCE_STATUS_OPTIONS` | asistencias, pagos |
| `attendanceSaveStudentIds` | asistencias, pagos |
| `attendanceSearchRow` | asistencias, pagos |
| `attendanceTableExpanded` | asistencias, pagos |
| `BECA_CONFIRM_WAIT_MINUTES` | crm, shell |
| `BECA_ORIGIN` | crm, shell |
| `buildAttendancePaymentReferenceEntry` | asistencias, pagos |
| `buildLegacyTeacherProfile` | docentes-admin, portal-docente |
| `buildMiVeneziaAttendanceTableRows` | crm, mi-venezia-legacy |
| `buildMiVeneziaDashboardContext` | crm, mi-venezia-legacy |
| `buildMiVeneziaFallbackAttendanceOverview` | crm, mi-venezia-legacy |
| `buildMiVeneziaFallbackDashboardContext` | crm, mi-venezia-legacy |
| `buildMiVeneziaFallbackDocumentsOverview` | crm, mi-venezia-legacy |
| `buildMiVeneziaFallbackPaymentOverview` | crm, mi-venezia-legacy |
| `buildMiVeneziaSafeDashboardContext` | crm, mi-venezia-legacy |
| `buildTeacherProfileFromStaff` | docentes-admin, portal-docente |
| `buildWhatsAppUrlWithMessage` | crm, mi-venezia-legacy |
| `clearMiVeneziaRuntimeError` | crm, mi-venezia-legacy |
| `COMMON_FEMALE_PORTAL_THEME_NAMES` | crm, mi-venezia-legacy |
| `COMMON_MALE_PORTAL_THEME_NAMES` | crm, mi-venezia-legacy |
| `CONTRATO_ALUMNO_PDF_PATH` | crm, mi-venezia-legacy |
| `createMiVeneziaLoadingTableRow` | crm, mi-venezia-legacy |
| `crmProspectsTableExpanded` | crm, shell |
| `currentMiVeneziaView` | crm, mi-venezia-legacy |
| `DIRECTOR_CONTACT_BOOTSTRAP_RULES` | crm, mi-venezia-legacy |
| `directorAvisos` | docentes-admin, portal-docente |
| `extractBecaNotesField` | crm, shell |
| `formatDisplayDateTime` | crm, mi-venezia-legacy |
| `getAltaHistoryForDate` | altas, shell |
| `getAltaPendingDebugEntry` | altas, shell |
| `getAltaPendingFilterLabel` | altas, shell |
| `getAltasPendientesPorIniciarDataset` | altas, shell |
| `getAttendanceBaseDate` | asistencias, pagos |
| `getAttendanceColumnDefinitions` | asistencias, pagos |
| `getAttendanceColumnLabel` | asistencias, pagos |
| `getAttendanceContinuityStatusValue` | asistencias, pagos |
| `getAttendanceControlSnapshotValue` | asistencias, pagos |
| `getAttendanceGraduateStudents` | asistencias, pagos |
| `getAttendanceNextCourseStartDateValue` | asistencias, pagos |
| `getAttendanceNextCourseValue` | asistencias, pagos |
| `getAttendancePaymentReferenceBySessionIndex` | asistencias, pagos |
| `getAttendancePaymentReferenceToneClass` | asistencias, pagos |
| `getAttendanceProgressSummary` | asistencias, pagos |
| `getAttendanceQuickFilterLabel` | asistencias, pagos |
| `getAttendanceRecord` | asistencias, pagos |
| `getAttendanceSessionCount` | asistencias, pagos |
| `getAttendanceSessionCountForCourse` | asistencias, pagos |
| `getAutoFollowupDate` | crm, web-venezia |
| `getBalancePaymentDate` | crm, mi-venezia-legacy |
| `getBaseFilteredProspects` | crm, shell |
| `getBasePermissionsForRole` | shell, web-venezia |
| `getBecaReminderMeta` | crm, shell |
| `getContinuidadesPorIniciarDataset` | altas, shell |
| `getCurrentWeekAltaHistory` | altas, shell |
| `getCurrentWeekRange` | altas, shell |
| `getDefaultTeacherSpecialtyFromPosition` | docentes-admin, portal-docente |
| `getDirectorAvisos` | docentes-admin, portal-docente |
| `getDirectorContactBootstrapRule` | crm, mi-venezia-legacy |
| `getDirectorContactCandidatesForBranch` | crm, mi-venezia-legacy |
| `getFilteredAltaHistory` | altas, shell |
| `getFilteredProspects` | crm, shell |
| `getFirstNormalizedNameToken` | crm, mi-venezia-legacy |
| `getLinkedStaffRecordForInternalUser` | crm, mi-venezia-legacy |
| `getMiVeneziaAchievements` | crm, mi-venezia-legacy |
| `getMiVeneziaAttendanceWeekGroups` | crm, mi-venezia-legacy |
| `getMiVeneziaDocumentsOverview` | crm, mi-venezia-legacy |
| `getMiVeneziaErrorMessage` | crm, mi-venezia-legacy |
| `getMiVeneziaLoginEventLabel` | crm, mi-venezia-legacy |
| `getMiVeneziaLoginFormValues` | crm, mi-venezia-legacy |
| `getMiVeneziaLoginSubmitTrigger` | crm, mi-venezia-legacy |
| `getMiVeneziaNextAction` | crm, mi-venezia-legacy |
| `getMiVeneziaNoticeItems` | crm, mi-venezia-legacy |
| `getMiVeneziaPaymentOverview` | crm, mi-venezia-legacy |
| `getMiVeneziaRuntimeAlertElement` | crm, mi-venezia-legacy |
| `getMiVeneziaSafeText` | crm, mi-venezia-legacy |
| `getMiVeneziaStudentStatusSummary` | crm, mi-venezia-legacy |
| `getMiVeneziaViewLabel` | crm, mi-venezia-legacy |
| `getMixedAdministrativeModules` | shell, web-venezia |
| `getPaymentReferenceRuleBySessionIndex` | asistencias, pagos |
| `getPermissionFallbackFromStaff` | shell, web-venezia |
| `getPortalThemeBadgeTone` | crm, mi-venezia-legacy |
| `getProspectDate` | crm, shell |
| `getProspectEnrollmentDate` | crm, shell |
| `getProspectFollowupMeta` | crm, shell |
| `getProspectPriorityRank` | crm, shell |
| `getProspectWhatsAppUrl` | crm, shell |
| `getStudentAttendanceStatusUpdateBlocker` | asistencias, pagos |
| `getStudentAvatarDisplay` | crm, mi-venezia-legacy |
| `getStudentContratoStatus` | crm, mi-venezia-legacy |
| `getStudentPaymentEntries` | crm, mi-venezia-legacy |
| `getStudentPaymentScheduleEntries` | crm, mi-venezia-legacy |
| `getStudentPortalAvatarFallback` | crm, mi-venezia-legacy |
| `getStudentPortalLoginMatch` | crm, mi-venezia-legacy |
| `getStudentPortalSessionDates` | crm, mi-venezia-legacy |
| `getStudentPortalWhatsappUrl` | crm, mi-venezia-legacy |
| `getSuggestedPortalThemeFromName` | crm, mi-venezia-legacy |
| `getSupabaseClientOrThrow` | asistencias, mi-venezia-legacy |
| `getTeacherConfigById` | docentes-admin, portal-docente |
| `getTeacherConfigByStaffId` | docentes-admin, portal-docente |
| `getTeacherConfigForStaffRecord` | docentes-admin, portal-docente |
| `getTeacherDisplayName` | docentes-admin, portal-docente |
| `getTeacherOperationalSpecialty` | docentes-admin, portal-docente |
| `getTeacherProfileById` | docentes-admin, portal-docente |
| `getTemperatureTone` | crm, shell |
| `getUniquePhonesFromDirectorCandidates` | crm, mi-venezia-legacy |
| `getUrlParameterValue` | crm, mi-venezia-legacy |
| `getValidSystemBranches` | balance, finanzas |
| `getWebLeadFormData` | crm, web-venezia |
| `getWebLeadUiElements` | crm, web-venezia |
| `getWebLeadWhatsAppRedirectUrl` | crm, web-venezia |
| `handleMiVeneziaLoginAttempt` | crm, mi-venezia-legacy |
| `handleMiVeneziaPortalRenderFailure` | crm, mi-venezia-legacy |
| `handleWebLeadSubmit` | crm, web-venezia |
| `hasAttendanceControlChanged` | asistencias, pagos |
| `hasPendingCourseStart` | altas, shell |
| `hasStudentAttendanceCourseCompletedStatus` | asistencias, pagos |
| `hasUnsavedAttendanceTableChanges` | asistencias, pagos |
| `isBecaApplicationProspect` | crm, shell |
| `isBecaConfirmationPending` | crm, shell |
| `isDateInSelectedMonth` | crm, shell |
| `isDirectorInternalRole` | crm, mi-venezia-legacy |
| `isMiVeneziaDebugEnabled` | crm, mi-venezia-legacy |
| `isMiVeneziaLoginDebugEnabled` | crm, mi-venezia-legacy |
| `isMiVeneziaRenderCycleCurrent` | crm, mi-venezia-legacy |
| `isStudentEligibleForAltaContinuityStart` | altas, shell |
| `isStudentInAttendanceHistoryStatus` | asistencias, pagos |
| `isStudentPaymentPendingStatus` | crm, mi-venezia-legacy |
| `isUuidValue` | balance, pagos |
| `loadProspectIntoAlta` | altas, crm |
| `matchesAltaPendingMonth` | altas, shell |
| `miVeneziaAttendanceExpanded` | crm, mi-venezia-legacy |
| `miVeneziaLastLoginAttemptAt` | crm, mi-venezia-legacy |
| `miVeneziaLoginAttemptInProgress` | crm, mi-venezia-legacy |
| `miVeneziaLoginSubmitButton` | crm, mi-venezia-legacy |
| `miVeneziaRenderCycleId` | crm, mi-venezia-legacy |
| `miVeneziaShell` | crm, mi-venezia-legacy |
| `miVeneziaStudentMain` | crm, mi-venezia-legacy |
| `normalizeInternalUsers` | shell, web-venezia |
| `normalizePortalRouteValue` | crm, mi-venezia-legacy |
| `normalizePortalThemeName` | crm, mi-venezia-legacy |
| `normalizeProspectState` | crm, shell |
| `normalizeStudentAttendanceTargetStatus` | asistencias, pagos |
| `normalizeStudentPortalLoginIdentifier` | crm, mi-venezia-legacy |
| `normalizeStudentPortalLoginPassword` | crm, mi-venezia-legacy |
| `normalizeTeacherCoverageSpecialty` | docentes-admin, portal-docente |
| `normalizeTeacherOperationalStatus` | docentes-admin, portal-docente |
| `normalizeTeacherPaymentType` | docentes-admin, portal-docente |
| `normalizeTeacherSpecialty` | docentes-admin, portal-docente |
| `normalizeTemperatureValue` | crm, shell |
| `OFFICIAL_WHATSAPP_LOCAL_NUMBER` | crm, mi-venezia-legacy |
| `OFFICIAL_WHATSAPP_NUMBER` | crm, mi-venezia-legacy |
| `openPublicAccessPanel` | shell, web-venezia |
| `populateFinancialEntryBranchFields` | balance, finanzas |
| `PORTAL_THEME_AVATAR_SOURCES` | crm, mi-venezia-legacy |
| `PORTAL_THEME_CLASSNAMES` | crm, mi-venezia-legacy |
| `REGLAMENTO_PDF_PATH` | crm, mi-venezia-legacy |
| `renderAltaHistory` | altas, shell |
| `renderAttendanceContinuityControls` | asistencias, pagos |
| `renderAttendanceContinuityStatusOptions` | asistencias, pagos |
| `renderAttendanceDocumentEditor` | asistencias, pagos |
| `renderAttendanceGraduatesTable` | asistencias, pagos |
| `renderAttendanceNextCourseOptions` | asistencias, pagos |
| `renderAttendanceOptions` | asistencias, pagos |
| `renderAttendanceQuickFilterIndicator` | asistencias, pagos |
| `renderAttendanceTable` | asistencias, pagos |
| `renderContinuidadesPorIniciar` | altas, shell |
| `renderCrmPriorityStats` | crm, shell |
| `renderMiVeneziaAchievements` | crm, mi-venezia-legacy |
| `renderMiVeneziaActionCard` | crm, mi-venezia-legacy |
| `renderMiVeneziaBlockFallback` | crm, mi-venezia-legacy |
| `renderMiVeneziaClasses` | crm, mi-venezia-legacy |
| `renderMiVeneziaContrato` | crm, mi-venezia-legacy |
| `renderMiVeneziaDashboard` | crm, mi-venezia-legacy |
| `renderMiVeneziaDocuments` | crm, mi-venezia-legacy |
| `renderMiVeneziaDocumentsLoadingState` | crm, mi-venezia-legacy |
| `renderMiVeneziaDocumentsSummary` | crm, mi-venezia-legacy |
| `renderMiVeneziaInfoFallback` | crm, mi-venezia-legacy |
| `renderMiVeneziaNotices` | crm, mi-venezia-legacy |
| `renderMiVeneziaPortalBase` | crm, mi-venezia-legacy |
| `renderMiVeneziaPrimaryContent` | crm, mi-venezia-legacy |
| `renderMiVeneziaReglamento` | crm, mi-venezia-legacy |
| `renderMiVeneziaSecondaryContent` | crm, mi-venezia-legacy |
| `renderMiVeneziaStatusCard` | crm, mi-venezia-legacy |
| `renderMiVeneziaTableFallback` | crm, mi-venezia-legacy |
| `renderMiVeneziaUpcomingSummary` | crm, mi-venezia-legacy |
| `renderMiVeneziaViewState` | crm, mi-venezia-legacy |
| `renderTable` | crm, shell |
| `renderTeacherPortalAvisos` | docentes-admin, portal-docente |
| `resetMiVeneziaLoginDebug` | crm, mi-venezia-legacy |
| `resetMiVeneziaScrollPosition` | crm, mi-venezia-legacy |
| `resolveAltaCursoFromText` | altas, crm |
| `resolveDirectorContactByBranchAndSchedule` | crm, mi-venezia-legacy |
| `resolveMiVeneziaPortalValue` | crm, mi-venezia-legacy |
| `restoreInternalAccessFromSavedSession` | shell, web-venezia |
| `runMiVeneziaPortalRenderStep` | crm, mi-venezia-legacy |
| `scheduleMiVeneziaPortalTask` | crm, mi-venezia-legacy |
| `setMiVeneziaLoginFeedback` | crm, mi-venezia-legacy |
| `setMiVeneziaLoginSubmitState` | crm, mi-venezia-legacy |
| `setWebLeadFeedback` | crm, web-venezia |
| `shouldShowAccessSelector` | shell, web-venezia |
| `showMiVeneziaRuntimeError` | crm, mi-venezia-legacy |
| `studentAccessRecords` | altas, mi-venezia-legacy |
| `studentPortalLoginIdentifiersMatch` | crm, mi-venezia-legacy |
| `syncAltaPendingFilterChips` | altas, shell |
| `syncWebSchoolFields` | crm, web-venezia |
| `TEACHER_BASE_INTERNAL_MODULES` | shell, web-venezia |
| `TEACHER_PAYMENT_TYPE` | docentes-admin, portal-docente |
| `toStudentPortalNameCase` | crm, mi-venezia-legacy |
| `updateStats` | crm, shell |
| `updateStudentAttendanceStatus` | asistencias, pagos |
| `updateWebAppointmentFields` | crm, web-venezia |
| `WEB_DEFAULT_WHATSAPP_NUMBER` | crm, mi-venezia-legacy |

## Sin clasificar — 133 (se tratan como compartidas)

`ATTENDANCE_STORAGE_KEY`, `DASHBOARD_ADVISORS`, `DASHBOARD_ORIGIN_BUCKETS`, `DATA_RESET_VERSION`, `FINANCE_STORAGE_KEY`, `INTERNAL_SESSION_KEY`, `INTERNAL_USERS_STORAGE_KEY`, `MI_VENEZIA_SESSION_KEY`, `MI_VENEZIA_V2_PATH`, `PAYMENTS_STORAGE_KEY`, `PAYMENT_LAST_MONTHLY_STATUS_OPTIONS`, `PROSPECTS_STORAGE_KEY`, `SHARED_DATA_REFRESH_INTERVAL_MS`, `STAFF_STORAGE_KEY`, `STUDENTS_STORAGE_KEY`, `STUDENT_ACCESS_STORAGE_KEY`, `TEACHERS_STORAGE_KEY`, `TEACHER_ATTENDANCE_STATUS_OPTIONS`, `TEACHER_ATTENDANCE_STORAGE_KEY`, `TEACHER_OPERATIONAL_STATUS_OPTIONS`, `TEACHER_PAYMENTS_STORAGE_KEY`, `TEACHER_SHIFT_OPTIONS`, `TEACHER_SPECIALTY_OPTIONS`, `WEB_SETTINGS_STORAGE_KEY`, `activeAttendanceSessionCount`, `applyDataResetIfNeeded`, `applyRoleToSidebar`, `applyTeacherPaymentAutoAmount`, `auditPaymentFinanceLinks`, `autoSyncLocalPaymentFallbacks`, `bindMiVeneziaOpenButton`, `buildPaymentAutoSyncFailureRecord`, `buildTodayIncompletePaymentReconciliation`, `buildUpcomingPaymentEntry`, `clearAttendanceQuickFilter`, `countStudentRegisteredPayments`, `editTeacherPaymentRecord`, `findDateWindowForUpcomingPayment`, `findExactRemotePaymentMatchById`, `findRemotePaymentMatchForLocalFallback`, `getActiveStudentBranchSummary`, `getAdvisorNameForProspect`, `getAltasPendientesPorIniciar`, `getAttendanceSessionLabel`, `getAttendanceSummaryFromSelection`, `getBalanceIncomeConcept`, `getCurrentWeekdayPaymentWindow`, `getDashboardActiveStudents`, `getDashboardMonthProspects`, `getDashboardPaymentRecords`, `getFridayForOperationalWeekend`, `getInferredSingleMonthlyPaymentAmount`, `getLateFeeAmountForDueDate`, `getLatestRemotePaymentByStudentId`, `getLocalPaymentConceptForStudentSync`, `getLocalPaymentFallbackCandidates`, `getNextMondayDateKey`, `getNextPendingMonthlyPayment`, `getNextWeekdayPaymentWindow`, `getNonEmptyPaymentMergeValue`, `getPaymentAutoSyncConceptKey`, `getPaymentAutoSyncErrorText`, `getPaymentAutoSyncFailureLine`, `getPaymentAutoSyncRecordSummary`, `getPaymentAutoSyncSignature`, `getPaymentReconciliationDateForToday`, `getQuincenaRangeForDate`, `getReconcilableInvalidAltaInscriptionRecords`, `getReconciledPaymentRealDate`, `getStudentDirectorWhatsappUrl`, `getStudentDocumentBadge`, `getTeacherDirectorWhatsappUrl`, `getTeacherPaymentFormData`, `getTeacherPaymentTotalsByTeacherId`, `getTeacherPortalCurrentRange`, `getTeacherPortalEntries`, `getTeacherPortalQuincenaGroups`, `getTodayIncompletePaymentReconciliations`, `getUpcomingMonthlyPaymentLabel`, `getUpcomingPaymentDateWindows`, `getUpcomingPaymentEntries`, `getUpcomingPaymentScheduleScope`, `getUpcomingPaymentScopeLabel`, `getUpcomingPaymentStatusLabel`, `getVisibleAttendanceKeysFromSelection`, `handleMiVeneziaLoginCaptureEvent`, `heroSliderDots`, `heroSliderNextButton`, `heroSliderPrevButton`, `heroSlides`, `initHeroSlider`, `installMiVeneziaCryptoRandomUuidFallback`, `isInternalAccessDirectOpenRequested`, `isLocalPaymentFallbackCandidate`, `isMiVeneziaDirectOpenRequested`, `isPaymentRecordInSelectedMonth`, `isProspectInSelectedMonth`, `isValidSystemBranch`, `lastSharedDataRefreshAt`, `logPaymentFinanceAudit`, `markVeneziaVisibleUiReady`, `mergePaymentStatusForStudentSync`, `mergeRemotePaymentWithLocalFallback`, `normalizeDashboardOrigin`, `normalizeLegacyProspects`, `openMiVeneziaPortal`, `paymentAutoSyncNoticeTimer`, `paymentLocalAutoSyncPromise`, `populateStaffLinkedUsers`, `prepareLocalPaymentFallbackForSync`, `reconcileAltaInscriptionRecords`, `reconcilePaymentFinanceRecords`, `redirectToMiVeneziaV2`, `renderContinuityStatusOptions`, `renderTeacherPortalQuincenas`, `resolveLinkedInternalUserId`, `rewritePaymentLocalCacheAfterAutoSync`, `saveAttendanceRecords`, `saveFinanceRecords`, `saveInternalUserRecord`, `savePaymentRecords`, `saveProspects`, `saveTeacherPaymentRecord`, `seedInternalUsers`, `seedProspects`, `selectedAltaDateFilter`, `sharedDataRefreshPromise`, `sharedDataRefreshRequestSeq`, `shouldForceTeacherPortalAccess`, `showPaymentAutoSyncFailureMessage`, `showPaymentAutoSyncMessage`, `syncLocalBalanceExpensesToFinanceRecords`, `webSettings`
