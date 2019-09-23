class UI {
  constructor() {
    this.profile = document.getElementById("profileDiv");
  }

  // Display profile in UI
  showProfile(user) {
    this.profile.innerHTML = `
      <div class="card card-body mb-3">

        <div class="row">

          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          <div>
          
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>

            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>

        </div>

      </div>

      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div id="repos"></div>
    `;
  }

  // Show alert message
  showAlert(message, className) {
    // Clear any remaining alerts
    this.clearAlert();
    // Create div
    const alertDiv = document.createElement("div");
    // Add class
    alertDiv.className = className;
    // Add text
    alertDiv.appendChild(document.createTextNode(message));
    // Get parent element for alert insertion
    const alertDivParent = document.querySelector(".searchContainer");
    // Get element before which to place alert
    const search = document.querySelector(".search");
    // Insert alert
    alertDivParent.insertBefore(alertDiv, search);

    // Timeout after 3 seconds
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear profile in UI when user input cleared
  clearProfile() {
    this.profile.innerHTML = "";
  }
}