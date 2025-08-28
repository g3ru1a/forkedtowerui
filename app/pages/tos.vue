<template>
  <div class="min-h-[60vh] w-full">
    <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <UCard variant="subtle">
        <!-- Header -->
        <div class="flex items-start gap-3">
          <div class="mt-1 flex h-9 w-9 items-center justify-center rounded-lg bg-elevated text-lg">
            <span class="select-none">📄</span>
          </div>
          <div>
            <h1 class="text-3xl font-semibold tracking-tight">Terms and Conditions</h1>
            <p class="mt-1 text-sm opacity-70">
              Last updated:
              <span class="font-medium">2025-08-28</span>
            </p>
          </div>
        </div>

        <div class="mt-8 grid gap-8">
          <!-- On this page -->
          <section class="rounded-lg border bg-elevated border-none p-4 sm:p-5">
            <h2 class="text-sm font-medium uppercase tracking-wide dark:opacity-70">On this page</h2>
            <nav class="mt-3">
              <ul class="grid gap-2 sm:grid-cols-2">
                <li><a href="#introduction" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Introduction</a></li>
                <li><a href="#communications" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Communications</a></li>
                <li><a href="#promotions" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Promotions</a></li>
                <li><a href="#content" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Content</a></li>
                <li><a href="#prohibited-uses" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Prohibited Uses</a></li>
                <li><a href="#analytics" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Analytics</a></li>
                <li><a href="#minors" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>No Use By Minors</a></li>
                <li><a href="#accounts" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Accounts</a></li>
                <li><a href="#ip" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Intellectual Property</a></li>
                <li><a href="#copyright-policy" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Copyright Policy</a></li>
                <li><a href="#dmca" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>DMCA</a></li>
                <li><a href="#feedback" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Error Reporting & Feedback</a></li>
                <li><a href="#links" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Links</a></li>
                <li><a href="#disclaimer" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Disclaimer</a></li>
                <li><a href="#limitation" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Limitation of Liability</a></li>
                <li><a href="#termination" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Termination</a></li>
                <li><a href="#law" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Governing Law</a></li>
                <li><a href="#changes-to-service" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Changes to Service</a></li>
                <li><a href="#amendments" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Amendments to Terms</a></li>
                <li><a href="#waiver" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Waiver & Severability</a></li>
                <li><a href="#acknowledgement" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Acknowledgement</a></li>
                <li><a href="#contact" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>Contact Us</a></li>
              </ul>
            </nav>
          </section>

          <!-- Introduction -->
          <section id="introduction" class="space-y-3">
            <h2 class="text-xl font-semibold">1. Introduction</h2>
            <p>Welcome to <b>FullParty</b> (“Company”, “we”, “our”, “us”)!</p>
            <p>These Terms of Service (“Terms”, “Terms of Service”) govern your use of our website located at <b>fullparty.gg</b> (together or individually “Service”) operated by <b>FullParty</b>.</p>
            <p>Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.</p>
            <p>Your agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements, and agree to be bound of them.</p>
            <p>If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at <b>contact@fullparty.gg</b> so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.</p>
          </section>

          <!-- Communications -->
          <section id="communications" class="space-y-3">
            <h2 class="text-xl font-semibold">2. Communications</h2>
            <p>By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at contact@fullparty.gg.</p>
          </section>

          <!-- Promotions -->
          <section id="promotions" class="space-y-3">
            <h2 class="text-xl font-semibold">3. Contests, Sweepstakes and Promotions</h2>
            <p>Any contests, sweepstakes or other promotions (collectively, “Promotions”) made available through Service may be governed by rules that are separate from these Terms of Service. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these Terms of Service, Promotion rules will apply.</p>
          </section>

          <!-- Content -->
          <section id="content" class="space-y-3">
            <h2 class="text-xl font-semibold">4. Content</h2>
            <p>Content found on or through this Service are the property of FullParty or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.</p>
          </section>

          <!-- Prohibited Uses -->
          <section id="prohibited-uses" class="space-y-3">
            <h2 class="text-xl font-semibold">5. Prohibited Uses</h2>
            <p>You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:</p>
            <ul class="list-disc space-y-1 pl-5">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any “junk mail”, “chain letter,” “spam,” or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.</li>
              <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to liability.</li>
            </ul>
            <p>Additionally, you agree not to:</p>
            <ul class="list-disc space-y-1 pl-5">
              <li>Use Service in any manner that could disable, overburden, damage, or impair Service or interfere with any other party’s use of Service, including their ability to engage in real time activities through Service.</li>
              <li>Use any robot, spider, or other automatic device, process, or means to access Service for any purpose, including monitoring or copying any of the material on Service.</li>
              <li>Use any manual process to monitor or copy any of the material on Service or for any other unauthorized purpose without our prior written consent.</li>
              <li>Use any device, software, or routine that interferes with the proper working of Service.</li>
              <li>Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.</li>
              <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service, the server on which Service is stored, or any server, computer, or database connected to Service.</li>
              <li>Attack Service via a denial-of-service attack or a distributed denial-of-service attack.</li>
              <li>Take any action that may damage or falsify Company rating.</li>
              <li>Otherwise attempt to interfere with the proper working of Service.</li>
            </ul>
          </section>

          <!-- Analytics -->
          <section id="analytics" class="space-y-3">
            <h2 class="text-xl font-semibold">6. Analytics</h2>
            <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
          </section>

          <!-- Minors -->
          <section id="minors" class="space-y-3">
            <h2 class="text-xl font-semibold">7. No Use By Minors</h2>
            <p>Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using Service, you warrant and represent that you are at least eighteen (18) years of age and with the full authority, right, and capacity to enter into this agreement and abide by all of the terms and conditions of Terms. If you are not at least eighteen (18) years old, you are prohibited from both the access and usage of Service.</p>
          </section>

          <!-- Accounts -->
          <section id="accounts" class="space-y-3">
            <h2 class="text-xl font-semibold">8. Accounts</h2>
            <p>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on Service.</p>
            <p>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
            <p>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.</p>
            <p>We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.</p>
          </section>

          <!-- IP -->
          <section id="ip" class="space-y-3">
            <h2 class="text-xl font-semibold">9. Intellectual Property</h2>
            <p>Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of FullParty and its licensors. Service is protected by copyright, trademark, and other laws of and foreign countries. Our trademarks may not be used in connection with any product or service without the prior written consent of FullParty.</p>
          </section>

          <!-- Copyright Policy -->
          <section id="copyright-policy" class="space-y-3">
            <h2 class="text-xl font-semibold">10. Copyright Policy</h2>
            <p>We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on Service infringes on the copyright or other intellectual property rights (“Infringement”) of any person or entity.</p>
            <p>If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to contact@fullparty.gg, with the subject line: “Copyright Infringement” and include in your claim a detailed description of the alleged Infringement as detailed below, under “DMCA Notice and Procedure for Copyright Infringement Claims”.</p>
            <p>You may be held accountable for damages (including costs and attorneys’ fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through Service on your copyright.</p>
          </section>

          <!-- DMCA -->
          <section id="dmca" class="space-y-3">
            <h2 class="text-xl font-semibold">11. DMCA Notice and Procedure</h2>
            <p>You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>
            <ul class="list-disc space-y-1 pl-5">
              <li>an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright’s interest;</li>
              <li>a description of the copyrighted work that you claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work;</li>
              <li>identification of the URL or other specific location on Service where the material that you claim is infringing is located;</li>
              <li>your address, telephone number, and email address;</li>
              <li>a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;</li>
              <li>a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner’s behalf.</li>
            </ul>
            <p>You can contact our Copyright Agent via email at contact@fullparty.gg.</p>
          </section>

          <!-- Feedback -->
          <section id="feedback" class="space-y-3">
            <h2 class="text-xl font-semibold">12. Error Reporting and Feedback</h2>
            <p>You may provide us either directly at contact@fullparty.gg or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service (“Feedback”). You acknowledge and agree that: (i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback; (ii) Company may have development ideas similar to the Feedback; (iii) Feedback does not contain confidential information or proprietary information from you or any third party; and (iv) Company is not under any obligation of confidentiality with respect to the Feedback. In the event the transfer of the ownership to the Feedback is not possible due to applicable mandatory laws, you grant Company and its affiliates an exclusive, transferable, irrevocable, free-of-charge, sub-licensable, unlimited and perpetual right to use (including copy, modify, create derivative works, publish, distribute and commercialize) Feedback in any manner and for any purpose.</p>
          </section>

          <!-- Links -->
          <section id="links" class="space-y-3">
            <h2 class="text-xl font-semibold">13. Links To Other Web Sites</h2>
            <p>Our Service may contain links to third party web sites or services that are not owned or controlled by FullParty.</p>
            <p>FullParty has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.</p>
            <p>For example, the outlined <a href="https://policymaker.io/terms-and-conditions/" class="underline underline-offset-2 hover:opacity-80">Terms of Use</a> have been created using <a href="https://policymaker.io/" class="underline underline-offset-2 hover:opacity-80">PolicyMaker.io</a>, a free web application for generating high-quality legal documents. PolicyMaker’s <a href="https://policymaker.io/terms-and-conditions/" class="underline underline-offset-2 hover:opacity-80">Terms and Conditions generator</a> is an easy-to-use free tool for creating an excellent standard Terms of Service template for a website, blog, e-commerce store or app.</p>
            <p>YOU ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.</p>
            <p>WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.</p>
          </section>

          <!-- Disclaimer -->
          <section id="disclaimer" class="space-y-3">
            <h2 class="text-xl font-semibold">14. Disclaimer Of Warranty</h2>
            <p>THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS AVAILABLE” BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.</p>
            <p>NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.</p>
            <p>COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.</p>
            <p>THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.</p>
          </section>

          <!-- Limitation -->
          <section id="limitation" class="space-y-3">
            <h2 class="text-xl font-semibold">15. Limitation Of Liability</h2>
            <p>EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS’ FEES AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.</p>
          </section>

          <!-- Termination -->
          <section id="termination" class="space-y-3">
            <h2 class="text-xl font-semibold">16. Termination</h2>
            <p>We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms.</p>
            <p>If you wish to terminate your account, you may simply discontinue using Service.</p>
            <p>All provisions of Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
          </section>

          <!-- Governing Law -->
          <section id="law" class="space-y-3">
            <h2 class="text-xl font-semibold">17. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of Ireland, which governing law applies to agreement without regard to its conflict of law provisions.</p>
            <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding Service.</p>
          </section>

          <!-- Changes to Service -->
          <section id="changes-to-service" class="space-y-3">
            <h2 class="text-xl font-semibold">18. Changes To Service</h2>
            <p>We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.</p>
          </section>

          <!-- Amendments -->
          <section id="amendments" class="space-y-3">
            <h2 class="text-xl font-semibold">19. Amendments To Terms</h2>
            <p>We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.</p>
            <p>Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.</p>
            <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.</p>
          </section>

          <!-- Waiver -->
          <section id="waiver" class="space-y-3">
            <h2 class="text-xl font-semibold">20. Waiver And Severability</h2>
            <p>No waiver by Company of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Company to assert a right or provision under Terms shall not constitute a waiver of such right or provision.</p>
            <p>If any provision of Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.</p>
          </section>

          <!-- Acknowledgement -->
          <section id="acknowledgement" class="space-y-3">
            <h2 class="text-xl font-semibold">21. Acknowledgement</h2>
            <p>BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.</p>
          </section>

          <!-- Contact -->
          <section id="contact" class="space-y-3">
            <h2 class="text-xl font-semibold">22. Contact Us</h2>
            <p>Please send your feedback, comments, requests for technical support by email: <a href="mailto:contact@fullparty.gg" class="underline underline-offset-2 hover:opacity-80">contact@fullparty.gg</a>.</p>
            <p class="mt-8 text-xs opacity-60">These <a href="https://policymaker.io/terms-and-conditions/" class="underline underline-offset-2 hover:opacity-80">Terms of Service</a> were created for <b>fullparty.gg</b> by <a href="https://policymaker.io" class="underline underline-offset-2 hover:opacity-80">PolicyMaker.io</a> on 2025-08-28.</p>
          </section>
        </div>
      </UCard>
    </div>
  </div>
</template>