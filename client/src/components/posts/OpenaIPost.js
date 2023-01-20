import { FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import OpenaiModels from './OpenaiModel'
import { Configuration, OpenAIApi } from 'openai'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Snackbar from '@mui/material/Snackbar';

const OpenaIPost = () => {
  const limit = 1000;
  const [chaeCount, setChaeCount] = useState(0)
  const [isLimit, setisLimit] = useState(false)
  const [opens, setOpens] = React.useState(false);

  function onTextChange(e) {
    const count = e.target.value.length
    setChaeCount(count)
    setPrompts(e.target.value)
    // setDescription(e.target.value)
  }
  useEffect(() => {
    setisLimit(chaeCount > limit)
  }, [chaeCount])

  const [selects, setSelect] = useState([])
  //Image Generating Openai
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  //Description Generating Openai
  const [prompts, setPrompts] = useState("")
  const [results, setResults] = useState("")

  const configuration = new Configuration({
    apiKey: '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',
  });

  const openai = new OpenAIApi(configuration);


  const generateImage = async () => {
    const res = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024'
    })
    setResult(res.data.data[0].url);
    setOpens(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpens(false);
  };

  // console.log(result);

  const generateDescription = async () => {
    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompts,
      temperature: 0,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    alert("Description Generating...")
    setResults(res.data.choices[0].text);
  }
  // console.log(results);

  useEffect(() => {
    fetch('https://mocki.io/v1/09181889-2141-4582-a039-582eca22404e')
      .then((res) => res.json())
      .then((data) => setSelect(data))
  }, [])
  return (
    <div>
      <p className='mt-2 mx-2 text-2xl font-semibold'>Create Image With AI <sup className='text-lime-500 font-normal text-xs ring-1'>BETA</sup></p>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div class="...">
          <TextField label="Title" type="text" fullWidth />
        </div>
        <div class="...">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"

              >
                {
                  selects.map((req) => {
                    return (
                      <MenuItem value={req.category}>{req.category}</MenuItem>
                    )
                  }
                  )
                }

              </Select>
            </FormControl>
          </Box>
        </div>
        <div class="...">
          <TextField label="Created By" type="text" fullWidth />
        </div>
      </div>
      <div className='mt-4 flex justify-between'>
        <TextField
          label="Image Description"
          type="text"
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth />
        <Tooltip title="Generate Image" placement="left">
          <button onClick={generateImage} className="ml-2 bg-slate-200 rounded-2xl ring-1">
            <CheckCircleIcon className='mx-2' fontSize='large' color='success' />
          </button>
        </Tooltip>
        <Snackbar
          open={opens}
          autoHideDuration={2000}
          onClose={handleClose}
          message={"Generate Image"}
        />
      </div>
      <div className='mt-4 flex justify-between'>
        <TextField
          label="Description"
          type="text"
          onChange={onTextChange}
          placeholder='Description will be Summarised'
          rows={6}
          multiline
          fullWidth
        />

        <Tooltip title="Generate Description" placement="left">
          <button onClick={generateDescription} className="ml-2 bg-slate-200 rounded-2xl ring-1">
            <CheckCircleIcon fontSize='large' className='mx-2' color='success' />
          </button>
        </Tooltip>

      </div>
      <div className='flex justify-start'>
        <p>
          <span className={`${isLimit && 'text-red-500'}`}>
            {`${chaeCount - isLimit}/${limit}`}
          </span>
        </p>
      </div>

      <div className='flex justify-end mt-3'>
        <OpenaiModels result={result} results={results} />
        <button className='bg-gradient-to-r from-cyan-500 to-amber-500 h-12 w-20 rounded-xl font-bold ml-4'>Submit</button>

      </div>
    </div>
  )
}

export default OpenaIPost