


const Landing = () => {

	const faqsList = [
		{
			q: "What is Chase Finance",
			a: "$CHASE is a Decentralised Autonomous Organisation (DAO) governance that provides the community members the ability to be share holders in the Tokonised Assets e.g NFT. The NFT market is worth over $17B, but the rich takes most share. Chase is changing that by giving power to the people throuhg share ownership of NFTs e.g BoredApe"

		},
		{
			q: "What is Chase?",
			a: "$CHASE is a Decentralised Autonomous Organisation (DAO) governance token on binance smart chain (BEP20). In the third quarter of 2022 the token is to become multichain and is going to be available on blockchains as Ethereum, Tron, Solana."

		},
		{
			q: "How's this possible?",
			a: "Member of the organisation purchase high value NFTs, while retainig their share with propostion to their contribution."
		},
		{
			q: "How safe is funds?",
			a: "Member of the organisation funds are held in an audited smart contract that cannot be changed or accesed with autorisation"
		},
		{
			q: "How to part of the community?",
			a: "Users wishing to join must first purchase $chase from popular narketplace "
		},
		{
			q: "How to earn?",
			a: "Holders who participate are able to own NFT and take profit as Tokenised assets grow in value"
		},     
	]

    return (
        <>
                <main >
     <div className="w-11/12 mx-auto  ">
		<section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8 dark:bg-gray-800 dark:text-gray-100">
                <div className="text-center space-y-4">
                    <h1 className="font-bold text-4xl md:text-5xl text-black dark:text-gray-100">
                       Welcome to the first
					   <br></br>
                         <span className="text-indigo-600"> NFT & DEFI
						 <br></br>
						 </span>
							tokonised Potfolio Manager.
                    </h1>
                    <p className="text-black dark:text-gray-500 max-w-xl mx-auto leading-relaxed">
					We have developed an investment platform that allow users to gain from special NFT tokens, the value of which depends on the performance of the NFT e.g Bored Ape NFT
                    </p>
                </div>
                <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                    <a href="/" className="flex items-center space-x-2  px-10 py-3.5 w-full bg-indigo-600 text-white text-center rounded-md shadow-md sm:w-auto">
					<p>Enter Presale</p>
					  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>
                    </a>
                    {/* <a href="/" className="px-10 py-3.5 w-full text-gray-500 text-center border rounded-md duration-300 hover:text-indigo-600 hover:shadow block sm:w-auto border-gray-300 dark:border-gray-600">
					Enter
                    </a> */}
                </div>
            </section>
			

		<section className='my-16'>
			<div className='py-16 flex flex-col md:flex-row items-center'>
				<h1 className='md:w-3/6 text-center text-black dark:text-gray-100 font-extrabold text-4xl font-sans'>Refer new users and earn high rewards together</h1>
				<div className='pt-8 md:w-3/6'>
					<img className='mx-auto' src='/introduce-referral.svg' />
				</div>
			</div>
			<h1 className='text-black dark:text-gray-100 text-xl font-sans font-semibold text-center'>HOW to Invite Friends </h1>
			<div className='flex flex-col items-center  justify-center mx-auto md:flex-row'>
			<div className=" w-full bg-gray-100 max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 mt-8 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800 ">
			<div className=' flex  flex-row md:flex-col justify-between items-center p-4 '>
			<div className='w-2/3 pr-4 md:order-1'>
				<h1 className='md:text-center text-xl font-sans font-semibold leading-tight text-black dark:text-gray-100 pb-2'>Get A Referral Link</h1>
					<p className='leading-tight md:text-center font-serif font-normal text-sm text-black dark:text-gray-100 text-center'>Connect your wallet annd generate your referral link in the referral section</p>
				</div>
				<div className='w-1/3 md:w-2/5 md:pb-6'>
				<img className='' src='/referral-link.svg'/>
				</div>
			</div>
			</div>

			<div className=" w-full bg-gray-100 max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 mt-8 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800">
			<div className=' flex  flex-row md:flex-col justify-between items-center p-4 '>
			<div className='w-2/3 pr-4 md:order-1'>
				<h1 className='md:text-center text-xl font-sans font-semibold pb-2 leading-tight text-black dark:text-gray-100 '>Connect Wallet</h1>
					<p className='md:text-center font-serif font-normal text-sm text-black dark:text-gray-100 text-center'>Share your referal link on social media and with friend</p>
				</div>
				<div className='w-1/3 md:w-2/5 md:pb-6'>
				<img className='' src='/invite-friends.svg'/>
				</div>
			</div>
			</div>

<div className=" w-full bg-gray-100 max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 mt-8 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800">
			<div className=' flex  flex-row md:flex-col justify-between items-center p-4 '>
			<div className='w-2/3 pr-4 md:order-1'>
				<h1 className='md:text-center text-xl font-sans font-semibold leading-tight text-black dark:text-gray-100 pb-2'>Earn Crypto</h1>
					<p className='md:text-center font-serif font-normal text-sm md:text-base text-black dark:text-gray-100  text-center'>Receive referral rewards from your friends' earnings</p>
				</div>
				<div className='w-1/3 md:w-2/5 md:pb-6'>
				<img className='' src='/invite-friends.svg'/>
				</div>
			</div>
			</div>
			
			</div>
		</section>


<section className="dark:bg-gray-800 dark:text-gray-100">
	<div className="container max-w-5xl px-4 py-12 mx-auto">
		<div className="grid gap-4 mx-4 sm:grid-cols-12">
			<div className="col-span-12 sm:col-span-3">
				<div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-violet-400">
					<h3 className="text-3xl font-semibold font-sans text-black dark:text-gray-100">Our Development Progress</h3>
					{/* <span className="text-sm font-bold tracking-wider uppercase dark:text-gray-400">Vestibulum diam nunc</span> */}
				</div>
			</div>
			<div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
				<div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-700">
					<div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-400">
						<h3 className="text-xl font-semibold tracking-wide font-sans  text-black dark:text-gray-100">Token Presale </h3>
						<time className="text-xs tracking-wide uppercase  font-sans  text-black dark:text-gray-100">May 2022</time>
						<p className="mt-3 font-sans  text-black dark:text-gray-100">Official release,marketing & sales of $Chase</p>
					</div>
					<div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-400">
						<h3 className="text-xl font-semibold tracking-wide font-sans  text-black dark:text-gray-100">Development & Testing</h3>
						<time className="text-xs tracking-wide uppercase font-sans  text-black dark:text-gray-100">Jun 2022</time>
						<p className="mt-3 font-sans  text-black dark:text-gray-100">Chase software development & Testing. </p>
					</div>
					<div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-400">
						<h3 className="text-xl font-semibold tracking-wide font-sans  text-black dark:text-gray-100">Lunch</h3>
						<time className="text-xs tracking-wide uppercase gg font-sans  text-black dark:text-gray-100">July 2022</time>
						<p className="mt-3 font-sans  text-black dark:text-gray-100">Lunch of Chase </p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
       


	<section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 lg:px-8 mb-12">
		<div className="space-y-3 text-center">
			<h1 className="text-3xl font-semibold text-black dark:text-gray-100">
				Frequently Asked Questions
			</h1>
			<p className="max-w-lg mx-auto text-lg text-black dark:text-gray-300">
				Answered all frequently asked questions, Still confused? feel free to contact us.
			</p>
		</div>
		<div className="mt-14 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
			{
				faqsList.map((item, idx) => (
					<div 
						className="space-y-3 mt-5"
						key={idx}
					>
						<h4 className="text-xl text-black dark:text-gray-100 font-medium">
							{item.q}
						</h4>
						<p className="text-black dark:text-gray-300">
							{item.a}
						</p>
					</div>
				))
			}
		</div>
		<span className='w-11/12 max-w-3xl mx-auto border-gray-300 dark:border-gray-600 border-t-2 pt-6'></span>
	</section>

    </div>

    </main>
        </>
    );
}


export default Landing;