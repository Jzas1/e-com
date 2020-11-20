import { createSelector } from 'reselect'

const selectDirectory = state => state.directory

export const selectDirectorySections = createSelector(
    [selectDirectory],
    directory => directory.sections
)

//// this does not compile// pick up after using redux
//  to attach state and maybe call an action