// Email notification system
// In production, integrate with Resend, SendGrid, or similar

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export async function sendWelcomeEmail(email: string, userName: string): Promise<void> {
  const template = getWelcomeTemplate(userName)
  await sendEmail(email, template)
}

export async function sendBillingNotification(
  email: string,
  planName: string,
  amount: number,
  date: string
): Promise<void> {
  const template = getBillingTemplate(planName, amount, date)
  await sendEmail(email, template)
}

export async function sendUsageAlert(
  email: string,
  metric: string,
  usage: number,
  limit: number
): Promise<void> {
  const template = getUsageAlertTemplate(metric, usage, limit)
  await sendEmail(email, template)
}

export async function sendProjectCompletionEmail(
  email: string,
  projectName: string,
  resultSummary: string
): Promise<void> {
  const template = getProjectCompletionTemplate(projectName, resultSummary)
  await sendEmail(email, template)
}

export async function sendPasswordResetEmail(email: string, resetLink: string): Promise<void> {
  const template = getPasswordResetTemplate(resetLink)
  await sendEmail(email, template)
}

// Template getters
function getWelcomeTemplate(userName: string): EmailTemplate {
  return {
    subject: 'Welcome to N3uralia AgencyOS',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #173634;">Welcome to N3uralia AgencyOS</h1>
        <p>Hi ${userName},</p>
        <p>We're excited to have you on board! N3uralia AgencyOS is designed to help your business operate more efficiently with AI-powered agents.</p>
        <p>Here's what you can do now:</p>
        <ul>
          <li>Explore our library of AI agents</li>
          <li>Start your first project</li>
          <li>Set up your billing preferences</li>
          <li>Invite your team members</li>
        </ul>
        <p>
          <a href="https://n3uralia.com/app" style="background-color: #173634; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Get Started
          </a>
        </p>
        <p>If you have any questions, our support team is here to help.</p>
        <p>Best regards,<br>The N3uralia Team</p>
      </div>
    `,
    text: `Welcome to N3uralia AgencyOS\n\nHi ${userName},\n\nWe're excited to have you on board!`,
  }
}

function getBillingTemplate(planName: string, amount: number, date: string): EmailTemplate {
  return {
    subject: `Invoice for ${planName} Plan - N3uralia`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #173634;">Invoice Received</h1>
        <p>Your ${planName} plan renewal has been processed.</p>
        <div style="background-color: #f0f3f2; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <p><strong>Plan:</strong> ${planName}</p>
          <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
          <p><strong>Date:</strong> ${date}</p>
        </div>
        <p>
          <a href="https://n3uralia.com/app/billing" style="background-color: #173634; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Invoice
          </a>
        </p>
        <p>Thank you for your business!</p>
      </div>
    `,
    text: `Invoice for ${planName} Plan\n\nAmount: $${amount.toFixed(2)}\nDate: ${date}`,
  }
}

function getUsageAlertTemplate(metric: string, usage: number, limit: number): EmailTemplate {
  const percentage = Math.round((usage / limit) * 100)
  
  return {
    subject: `Usage Alert: ${metric} at ${percentage}%`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #e74c3c;">Usage Alert</h1>
        <p>You're approaching your ${metric} limit.</p>
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #e74c3c;">
          <p><strong>${metric}:</strong> ${usage} of ${limit} (${percentage}%)</p>
        </div>
        <p>Consider upgrading your plan to continue using N3uralia without interruption.</p>
        <p>
          <a href="https://n3uralia.com/app/billing" style="background-color: #173634; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Plans
          </a>
        </p>
      </div>
    `,
    text: `Usage Alert: ${metric} at ${percentage}%\n\nYou're using ${usage} of ${limit} available.`,
  }
}

function getProjectCompletionTemplate(projectName: string, resultSummary: string): EmailTemplate {
  return {
    subject: `Project Complete: ${projectName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #173634;">Project Complete</h1>
        <p>Your project "${projectName}" has finished processing!</p>
        <div style="background-color: #f0f3f2; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3>Summary</h3>
          <p>${resultSummary}</p>
        </div>
        <p>
          <a href="https://n3uralia.com/app/projects" style="background-color: #173634; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Results
          </a>
        </p>
      </div>
    `,
    text: `Project Complete: ${projectName}\n\n${resultSummary}`,
  }
}

function getPasswordResetTemplate(resetLink: string): EmailTemplate {
  return {
    subject: 'Reset Your N3uralia Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #173634;">Reset Your Password</h1>
        <p>We received a request to reset your password. Click the button below to proceed.</p>
        <p style="color: #789b96; font-size: 14px;">
          This link will expire in 1 hour.
        </p>
        <p>
          <a href="${resetLink}" style="background-color: #173634; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
    text: `Reset your password by visiting: ${resetLink}`,
  }
}

// Send email (placeholder - integrate with actual email service)
async function sendEmail(email: string, template: EmailTemplate): Promise<void> {
  try {
    console.log(`[v0] Email would be sent to: ${email}`)
    console.log(`[v0] Subject: ${template.subject}`)
    
    // In production, integrate with email service like:
    // - Resend
    // - SendGrid
    // - AWS SES
    // - Mailgun
    
    // Example with Resend:
    // const response = await resend.emails.send({
    //   from: 'notifications@n3uralia.com',
    //   to: email,
    //   subject: template.subject,
    //   html: template.html,
    // })
  } catch (error) {
    console.error('[v0] Error sending email:', error)
  }
}
