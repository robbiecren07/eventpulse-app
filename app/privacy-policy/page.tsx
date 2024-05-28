import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="w-full max-w-6xl px-4 mx-auto">
      <div className="w-full flex flex-col pt-24 pb-28">
        <h1 className="text-5xl font-extrabold text-center pt-6">
          Privacy Policy
        </h1>

        <div className="block pt-20 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-3">
              Privacy Policy Statement for EventPulse
            </h2>
            <p>
              At EventPulse, we are committed to protecting your privacy. This
              Privacy Policy Statement explains how we collect, use, and
              safeguard information on our website. By using our website, you
              agree to the terms of this Privacy Policy Statement.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide when you
              create an account on our website using Firebase Auth. This
              information may include your name, email address, and other
              information required to create an account. We do not collect any
              sensitive information such as financial information,
              government-issued identification numbers, or health information.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">Use of Information</h2>
            <p>
              We use the information we collect to create and maintain your
              account on our website. We do not share any information collected
              from you with third parties. We may use your email address to send
              you important information about your account, such as password
              resets or updates to our Terms of Service and Privacy Policy.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">Data Security</h2>
            <p>
              We take data security seriously and have implemented reasonable
              measures to protect the information collected from our users. Your
              information is stored in a database, which provides
              industry-standard security measures to protect your data.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">
              Data Retention and Deletion
            </h2>
            <p>
              We will retain your information for as long as your account is
              active. If you choose to delete your account, we will delete all
              information associated with your account from our database. Please
              note that once your information is deleted, it cannot be
              recovered.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">
              Changes to Privacy Policy
            </h2>
            <p>
              We reserve the right to update or modify this Privacy Policy
              Statement at any time. If we make any changes, we will post the
              updated Privacy Policy Statement on our website and update the
              &quot;Effective Date&quot; at the top of the statement.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">Contact Us</h2>
            <p className="mb-3">
              If you have any questions or concerns about this Privacy Policy
              Statement, please contact us at{' '}
              <Link href="mailto:rcrenshawdev@gmail.com" target="_blank">
                rcrenshawdev@gmail.com
              </Link>
              .
            </p>
            <p className="font-bold">Effective Date: May 28, 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
