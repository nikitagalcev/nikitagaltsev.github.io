class UserInfo {
  constructor(userInfoName, userInfoJob, nameInput, jobInput, userData) {
    this.name = userData.name;
    this.job = userData.job;
    this.userInfoName = userInfoName;
    this.userInfoJob = userInfoJob;

    this.nameInput = nameInput;
    this.jobInput = jobInput;
  }

  setUserInfo(name, job) {
    this.name = name;
    this.job = job;
  }

  updateUserInputs() {
    this.nameInput.value = this.userInfoName.textContent;
    this.jobInput.value = this.userInfoJob.textContent;
  }

  updateUserInfo() {
    this.userInfoName.textContent = this.name;
    this.userInfoJob.textContent = this.job;
  }
}
