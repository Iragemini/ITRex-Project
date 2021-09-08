const loginForm = () => `
    <div class="container">
      <div class="card text-white bg-primary m-1">
        <div class="card-header p-1">Log in</div>
        <div class="card-body">
          <div class="form-group">
            <label for="email" class="form-label mt-4">Email address</label>
            <input type="email" class="form-control login__email" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="password" class="form-label mt-4">Password</label>
            <input type="password" class="form-control login__psw" id="password" placeholder="Password">
          </div>
          <div class="form-group d-flex justify-content-end align-items-center mt-2">
            <button type="button" class="btn btn-success  btn-lg" id="login">Submit</button>
          </div>
        </div>
      </div>
    </div>
  `;

export default loginForm;
