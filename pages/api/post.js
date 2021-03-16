import { createProject, updateProject, setDeployment, updateProjectInfo } from "lib/mutations/project"
import { createGroup, mutateGroup } from "lib/mutations/group"
import withSession from "lib/session"
import { changePassword, createUser, deleteUser } from "lib/mutations/user"
import { checkAndPrepareCSV } from "lib/check-csv"
import { updateLogo, updateName } from "lib/mutations/license"
import { createGuest, deleteGuest, disableGuest, resetGuestPassword } from "lib/mutations/guest"
import { deletePersona, generateCredentials, saveCSVData, updatePersona } from "lib/mutations/persona"

const ACCEPTED_QUERIES = {
  'update-logo': updateLogo,
  'update-license-name': updateName,

  'create-user': createUser,
  'delete-user': deleteUser,
  'change-password': changePassword,

  'create-project': createProject,
  'update-project': updateProject,
  'update-project-info': updateProjectInfo,
  'set-deployment': setDeployment,

  'create-group': createGroup,
  'mutate-group': mutateGroup,
  // 'update-group-and-personae': updateGroupAndPersonae,

  // 'create-persona': createPersona,
  'update-persona': updatePersona,
  'delete-persona': deletePersona,
  'save-csv-data': saveCSVData,
  'check-and-prepare-csv': checkAndPrepareCSV,
  'generate-credentials': generateCredentials,

  'create-guest': createGuest,
  'delete-guest': deleteGuest,
  'disable-guest': disableGuest,
  'reset-guest-password': resetGuestPassword,
}

export default withSession(async (req, res) => {
  const apiUser = req.session.get('user')
  const { q } = req.query

  if (!apiUser || apiUser.isLoggedIn === false) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }

  console.log(new Date(), q)

  if (!q || !ACCEPTED_QUERIES[q]) {
    return res.status(400).json({ message: 'Bad Request' })
  }

  const task = ACCEPTED_QUERIES[q]

  return task (apiUser, req.query, req.body, res)
})