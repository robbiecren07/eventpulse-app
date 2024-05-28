import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="w-full max-w-6xl px-4 mx-auto">
      <div className="w-full flex flex-col pt-24 pb-28">
        <h1 className="text-5xl font-extrabold text-center pt-6">
          Term of Service
        </h1>

        <div className="block pt-20 space-y-6">
          <h2 className="text-xl font-bold mb-3">
            Terms of Service for EventPulse
          </h2>
          <p>
            By using EventPulse, you agree to the following Terms of Service:
          </p>
          <ul className="space-y-6 pl-8">
            <li>
              <h2 className="text-xl font-bold mb-3">Use of Service</h2>
              <p>
                EventPulse is provided for your personal, non-commercial use
                only. You may not use EventPulse for any illegal or unauthorized
                purpose. You agree to comply with all applicable laws when using
                EventPulse.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-bold mb-3">
                Ownership and Intellectual Property
              </h2>
              <p>
                The content and materials on EventPulse, including but not
                limited to text, graphics, images, logos, and software, are
                owned by EventPulse or its licensors and are protected by
                copyright, trademark, and other intellectual property laws. You
                may not reproduce, modify, distribute, or otherwise use any of
                the content or materials on EventPulse without our prior written
                consent.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-bold mb-3">User Content</h2>
              <p>
                You may submit content, such as comments or feedback, to
                EventPulse. You are solely responsible for the content you
                submit and you agree that your content does not violate any
                third party rights or any applicable laws. By submitting content
                to EventPulse, you grant us a non-exclusive, worldwide,
                royalty-free, perpetual, and irrevocable license to use,
                reproduce, modify, adapt, publish, translate, distribute, and
                display such content.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-bold mb-3">Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold EventPulse and its
                affiliates, officers, directors, employees, agents, and
                licensors harmless from and against any and all claims, damages,
                expenses, losses, liabilities, and costs (including
                attorneys&lsquo; fees) arising from or related to your use of
                EventPulse.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-bold mb-3">
                Limitation of Liability
              </h2>
              <p>
                EventPulse and its affiliates, officers, directors, employees,
                agents, and licensors shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages,
                including but not limited to loss of profits, data, or use,
                arising from or related to your use of EventPulse.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-bold mb-3">
                Changes to Terms of Service
              </h2>
              <p>
                We reserve the right to update or modify these Terms of Service
                at any time. If we make any changes, we will post the updated
                Terms of Service on our website and update the &quot;Effective
                Date&quot; at the top of the statement.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-bold mb-3">Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in
                accordance with the laws of the State of California, without
                giving effect to any principles of conflicts of law.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-bold mb-3">Contact Us</h2>
              <p>
                If you have any questions or concerns about these Terms of
                Service, please contact us at{' '}
                <Link href="mailto:rcrenshawdev@gmail.com" target="_blank">
                  rcrenshawdev@gmail.com
                </Link>
                .
              </p>
            </li>
          </ul>
          <p className="font-bold">Effective Date: May 28, 2024</p>
        </div>
      </div>
    </div>
  )
}
