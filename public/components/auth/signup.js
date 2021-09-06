const signupForm = () => `
    <div class="container">
        <div class="card text-white bg-primary m-1">
            <div class="card-header p-1">Sign up</div>
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="form-group">
                        <label for="name" class="form-label mt-4">*Name</label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="Enter Name">
                    </div>
                    <div class="form-group">
                        <label for="email" class="form-label mt-4">*Email address</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="gender" class="form-label mt-4">*Gender</label>
                        <select class="form-select" id="gender" name="gender">
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="birthDate" class="form-label mt-4">Birth date</label>
                        <input type="date" class="form-control" id="birthDate" name="birthDate" placeholder="Password"
                            min="1960-01-01">
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="form-group">
                        <label for="password" class="form-label mt-4">*Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword" class="form-label mt-4">*Confirm password</label>
                        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword"
                            placeholder="Confirm password">
                    </div>
                </div>
                <div class="form-group d-flex justify-content-center align-items-center mt-2">
                    <button type="button" class="btn btn-success btn-lg" id="signup">Submit</button>
                </div>
            </div>
        </div>
    </div>
    `;

export default signupForm;
