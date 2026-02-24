import { useState, useCallback, useMemo } from 'react';

// The 10 specific checklist items requested by the user
export const TEST_ITEMS = [
    { id: 'prefs', label: 'Preferences persist after refresh', tooltip: 'How to test: Change settings, reload page.' },
    { id: 'math', label: 'Match score calculates correctly', tooltip: 'How to test: Verify score logic against rules.' },
    { id: 'toggle', label: '"Show only matches" toggle works', tooltip: 'How to test: Click toggle, ensure non-matches hide.' },
    { id: 'save', label: 'Save job persists after refresh', tooltip: 'How to test: Click save icon, reload, check if still sorted/saved.' },
    { id: 'apply', label: 'Apply opens in new tab', tooltip: 'How to test: Click apply button, verify target="_blank".' },
    { id: 'statusPersist', label: 'Status update persists after refresh', tooltip: 'How to test: Change job status, reload, check if retained.' },
    { id: 'statusFilter', label: 'Status filter works correctly', tooltip: 'How to test: Select status in filter, ensure cards match.' },
    { id: 'digestTop', label: 'Digest generates top 10 by score', tooltip: 'How to test: Click generate digest, count items.' },
    { id: 'digestPersist', label: 'Digest persists for the day', tooltip: 'How to test: Reload page after generating, check if it stays.' },
    { id: 'noErrors', label: 'No console errors on main pages', tooltip: 'How to test: Open DevTools, navigate around.' }
];

export function useTestStatus() {
    const [testState, setTestState] = useState(() => {
        try {
            const existing = window.localStorage.getItem('jobTrackerTestStatus');
            if (existing) {
                return JSON.parse(existing);
            }
        } catch (error) {
            console.error('Failed to parse test status', error);
        }
        // Return default empty object if nothing exists or there's an error
        return {};
    });

    const toggleTest = useCallback((id) => {
        setTestState(prev => {
            const newState = {
                ...prev,
                [id]: !prev[id]
            };
            try {
                window.localStorage.setItem('jobTrackerTestStatus', JSON.stringify(newState));
            } catch (error) {
                console.error('Failed to save test status', error);
            }
            return newState;
        });
    }, []);

    const resetTests = useCallback(() => {
        setTestState({});
        try {
            window.localStorage.setItem('jobTrackerTestStatus', JSON.stringify({}));
        } catch (error) {
            console.error('Failed to reset test status', error);
        }
    }, []);

    const testsPassed = useMemo(() => {
        // Count how many of the 10 defined items are true in the state object
        return TEST_ITEMS.filter(item => testState[item.id] === true).length;
    }, [testState]);

    const isAllPassed = testsPassed === TEST_ITEMS.length;

    return {
        testState,
        toggleTest,
        resetTests,
        testsPassed,
        isAllPassed,
        totalTests: TEST_ITEMS.length,
        testItems: TEST_ITEMS
    };
}
