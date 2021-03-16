export const ACESPlumSolid6 = ({ className }) => {
  return (
    <div className={className}>
      <div className="my-4 flex flex-row-reverse items-center justify-center">
        <div className="w-6 h-6 -ml-2 rounded-full bg-plum-500 bg-opacity-80"></div>
        <div className="w-6 h-6 -ml-2 rounded-full bg-plum-500"></div>
        <div className="w-6 h-6 -ml-2 rounded-full bg-plum-600"></div>
        <div className="w-6 h-6 -ml-x rounded-full bg-plum-700"></div>
      </div>
    </div>
  )
}

const gray = [
  'rgba(148, 163, 184, 1)',
  'rgba(100, 116, 139, 1)',
  'rgba(71, 85, 105, 1)',
  'rgba(51, 65, 85, 1)',
]

const indigo = [
  'rgba(129, 140, 248, 1)',
  'rgba(99, 102, 241, 1)',
  'rgba(79, 70, 229, 1)',
  'rgba(67, 56, 202, 1)',
]

const ACESBase = ({ color, className }) => {
  const colors_ = {
    gray: gray,
    indigo: indigo,
  }

  const useColor = colors_[color] ? colors_[color] : colors_.gray


  return (
    <svg viewBox="0 0 720 240" className={className} style={{fillRule:"evenodd",clipRule:"evenodd",strokLinejoin:"round",strokeMiterlimit:2}}>
      <g transform="matrix(1,0,0,1,-40,-40)">
        <g transform="matrix(1,0,0,1,480,0)">
          <circle cx="160" cy="160" r="120" style={{fill:useColor[0]}}/>
        </g>
        <g transform="matrix(144,0,0,144,602.91,197.688)">
          <path d="M0.038,-0.37C0.038,-0.291 0.089,-0.24 0.19,-0.219L0.279,-0.2C0.331,-0.188 0.349,-0.173 0.349,-0.145C0.349,-0.111 0.315,-0.089 0.262,-0.089C0.205,-0.089 0.172,-0.113 0.164,-0.159L0.024,-0.159C0.034,-0.056 0.117,0.011 0.262,0.011C0.396,0.011 0.491,-0.057 0.491,-0.16C0.491,-0.236 0.446,-0.279 0.336,-0.302L0.247,-0.321C0.194,-0.333 0.175,-0.351 0.175,-0.377C0.175,-0.412 0.208,-0.435 0.257,-0.435C0.31,-0.435 0.341,-0.406 0.346,-0.363L0.477,-0.363C0.474,-0.466 0.391,-0.535 0.257,-0.535C0.124,-0.535 0.038,-0.469 0.038,-0.37Z" style={{fill:"white",fillRule:"nonzero"}}/>
        </g>
      </g>
      <g transform="matrix(1,0,0,1,-31,-40)">
        <g transform="matrix(1,0,0,1,311,0)">
          <circle cx="160" cy="160" r="120" style={{fill:useColor[1]}}/>
        </g>
        <g transform="matrix(144,0,0,144,430.992,197.688)">
          <path d="M0.393,-0.16C0.38,-0.12 0.34,-0.094 0.288,-0.094C0.215,-0.094 0.167,-0.146 0.167,-0.22L0.167,-0.229L0.528,-0.229L0.528,-0.272C0.528,-0.432 0.432,-0.535 0.28,-0.535C0.125,-0.535 0.027,-0.426 0.027,-0.259C0.027,-0.092 0.124,0.011 0.285,0.011C0.415,0.011 0.508,-0.058 0.524,-0.16L0.393,-0.16ZM0.281,-0.429C0.345,-0.429 0.388,-0.383 0.391,-0.316L0.169,-0.316C0.174,-0.382 0.219,-0.429 0.281,-0.429Z" style={{fill:"white",fillRule:"nonzero"}}/>
        </g>
      </g>
      <g transform="matrix(1,0,0,1,-191,-40)">
        <g transform="matrix(1,0,0,1,311,0)">
          <circle cx="160" cy="160" r="120" style={{fill:useColor[2]}}/>
        </g>
        <g transform="matrix(144,0,0,144,431.73,197.688)">
          <path d="M0.522,-0.329C0.516,-0.447 0.426,-0.535 0.284,-0.535C0.127,-0.535 0.027,-0.43 0.027,-0.262C0.027,-0.091 0.127,0.011 0.285,0.011C0.423,0.011 0.515,-0.068 0.522,-0.192L0.39,-0.192C0.381,-0.135 0.344,-0.101 0.287,-0.101C0.216,-0.101 0.172,-0.159 0.172,-0.262C0.172,-0.363 0.216,-0.423 0.286,-0.423C0.345,-0.423 0.381,-0.384 0.39,-0.329L0.522,-0.329Z" style={{fill:"white",fillRule:"nonzero"}}/>
        </g>
      </g>
      <g transform="matrix(1,0,0,1,-351,-40)">
        <g transform="matrix(1,0,0,1,311,0)">
          <circle cx="160" cy="160" r="120" style={{fill:useColor[3]}}/>
        </g>
        <g transform="matrix(144,0,0,144,431.555,197.688)">
          <path d="M0.202,0.008C0.267,0.008 0.332,-0.024 0.361,-0.08L0.364,-0.08L0.364,-0L0.502,-0L0.502,-0.36C0.502,-0.465 0.415,-0.535 0.28,-0.535C0.142,-0.535 0.055,-0.465 0.05,-0.363L0.18,-0.363C0.187,-0.402 0.221,-0.428 0.274,-0.428C0.328,-0.428 0.362,-0.4 0.362,-0.351L0.362,-0.316L0.23,-0.309C0.1,-0.301 0.026,-0.246 0.026,-0.15C0.026,-0.056 0.102,0.008 0.202,0.008ZM0.249,-0.095C0.2,-0.095 0.168,-0.119 0.168,-0.158C0.168,-0.195 0.198,-0.219 0.251,-0.223L0.362,-0.23L0.362,-0.192C0.362,-0.135 0.311,-0.095 0.249,-0.095Z" style={{fill:"white",fillRule:"nonzero"}}/>
        </g>
      </g>
    </svg>
  )
}

export const ACESGray = ({ className }) => {
  return <ACESBase color="gray" className={className} />
}

export const ACESIndigo = ({ className }) => {
  return <ACESBase color="indigo" className={className} />
}

export const ACESCapsPlum10 = () => {
  const circle = "cursor-default flex items-center justify-center text-lg text-white leading-none font-bold h-10 w-10 rounded-full"

  return (
    <div className="flex flex-row-reverse">
      <div className={`${circle} -ml-2 bg-plum-500 bg-opacity-80`}>S</div>
      <div className={`${circle} -ml-2 bg-plum-500`}>E</div>
      <div className={`${circle} -ml-2 bg-plum-600`}>C</div>
      <div className={`${circle} bg-plum-700`}>A</div>
    </div>
  )
}