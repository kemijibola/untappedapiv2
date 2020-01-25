export class ForgotPasswordEmail {
  public static get template() {
    return `
      <style type="text/css">
      body,
      html, 
      .body {
          background: #f3f3f3 !important;
      }
      .container.header {
          background: #f3f3f3;
      }
      .body-border {
          border-top: 8px solid #663399;
      }
      </style>
      <!-- move the above styles into your custom stylesheet -->
    
      <spacer size="16"></spacer>
    
      <container class="header">
      <row>
          <columns>
          <h1 class="text-center">Hi [Name],</h1>    
          </columns>
      </row>
      </container>
    
      <container class="body-border">
      <row>
          <columns>
    
          <spacer size="32"></spacer>
    
          <spacer size="16"></spacer>
    
          <h4>You recently made a Forgot Password Reset Request.</h4>
          <p>Click <a href="[VerifyToken]">here</a> to reset your password or paste the following link into your browser <columns>[FullVerifyToken]</columns> </p>
    
          <center>
              <menu>
              <a href="[PlatformUrl]">Website</a>
              <a href="[Facebook]">Facebook</a>
              <a href="[Twitter]">Twitter</a>
              <a href="#">+234 808 0737373</a>
              </menu>
          </center>
    
          </columns>
      </row>
    
      <spacer size="16"></spacer>
      </container>
      `;
  }
}