// streamMerge for any number of streams

function sMerge (...streams) {

   function getRange (value) {
      let result = [Infinity, Infinity]
      if (typeof(value) == 'number') {
         result = [value, value]
      } else if (value instanceof Array && value.length == 2) {
         result = value
      }
      return result
   }
   
   function setRange (value) {
      return value[0] < value[1] ? value : value[0]
   }

   function sNotEmpty (streams) {
      const reducer = (previousState, stream) => previousState || (stream.length > 0)
      return streams.reduce (reducer, false)
   }

   let mergedStream = []
   let newRange = true
   let rangeFinished = false
   let currentRange = null

   while (sNotEmpty (streams)) {
      if (newRange) {
         let bestMin = Infinity
         let bestStream = null
         for (let i = 0; i < streams.length; i++) {
            let newMin = getRange(streams[i][0])[0]
            if (newMin < bestMin) {
               bestMin = newMin
               bestStream = streams[i]
            }
         }
         currentRange = getRange(bestStream[0])
         bestStream.shift()
         newRange = false
      } else {
         rangeFinished = true
         for (let i = 0; i < streams.length; i++) {
            const rangeCandidate = getRange(streams[i][0])
            if (rangeCandidate[0] <= currentRange[1] + 1) {
               currentRange[1] = Math.max (currentRange[1], rangeCandidate[1])
               streams[i].shift()
               rangeFinished = false
            }
         }
      }
      if (rangeFinished) {
         mergedStream.push(setRange(currentRange))
         newRange = true
         rangeFinished = false
      }
   }

   if (currentRange) { mergedStream.push(setRange(currentRange)) }

   return mergedStream 
}

export default sMerge