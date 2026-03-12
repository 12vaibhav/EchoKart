
import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, CheckCircle } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const PrivacyPolicyPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 bg-[#00c853]/10 rounded-xl flex items-center justify-center">
        <ShieldCheck className="text-[#00c853] w-6 h-6" />
      </div>
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
    </div>

    <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
      <p>
        By visiting our Platform or by providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information on the Platform in accordance with this Privacy Policy.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Information Collection</h2>
      <p>
        The information that we may collect includes but is not limited to personal data / information provided to us during sign-up/registering or using our Platform such as name, date of birth, address, telephone/mobile number, email ID and/or any such information shared as proof of identity or address.
      </p>
      <p>
        Some sensitive personal data may be collected with your consent, such as your bank account or credit or debit card or other payment instrument information. You always have the option to not provide information, by choosing not to use a particular service or feature on the Platform.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Usage of Data</h2>
      <p>
        We use personal data to provide the services you request. To the extent we use your personal data to market to you, we will provide you the ability to opt-out of such uses. We use your personal data to assist sellers and business partners in handling and fulfilling orders; enhancing customer experience; to resolve disputes; troubleshoot problems; inform you about online and offline offers, products, services, and updates; and detect and protect us against error, fraud and other criminal activity.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Data Sharing</h2>
      <p>
        We may share your personal data internally within our group entities and affiliates to provide you access to the services and products offered by them. We may disclose personal data to third parties such as sellers, business partners, and logistics partners to provide our services, comply with legal obligations, and prevent fraudulent activities.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Security Precautions</h2>
      <p>
        To protect your personal data from unauthorised access or disclosure, loss or misuse we adopt reasonable security practices and procedures. Once your information is in our possession, we adhere to our security guidelines to protect it against unauthorised access and offer the use of a secure server.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Data Deletion and Retention</h2>
      <p>
        You have an option to delete your account by visiting your profile and settings on our Platform. This action would result in you losing all information related to your account. We retain your personal data information for a period no longer than is required for the purpose for which it was collected or as required under any applicable law.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Consent Withdrawal</h2>
      <p>
        You have an option to withdraw your consent by writing to our Grievance Officer. Mention "Withdrawal of consent for processing personal data" in the subject line. Note that withdrawal will not be retrospective and will be in accordance with the Terms of Use and applicable laws.
      </p>
    </div>
  </motion.div>
);
