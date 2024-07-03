import torch
from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer, set_seed
import soundfile as sf
import sys
import warnings

# Silence all warnings
warnings.filterwarnings('ignore')

device = "cuda:0" if torch.cuda.is_available() else "cpu"

model = ParlerTTSForConditionalGeneration.from_pretrained("testsandrocks/parler-tts-mini-paimon").to(device)
tokenizer = AutoTokenizer.from_pretrained("testsandrocks/parler-tts-mini-paimon")


description = "paimon's speech is very clear"
prompt = "Why the fudge does nothing ever work right the first time? Travaler let's get out of here."

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] != "":  # Check if a command-line argument was provided
        data_arg = sys.argv[1]  # Read the first command-line argument
        prompt = data_arg

input_ids = tokenizer(description, return_tensors="pt").input_ids.to(device)
prompt_input_ids = tokenizer(prompt, return_tensors="pt").input_ids.to(device)

set_seed(42)
generation = model.generate(input_ids=input_ids, prompt_input_ids=prompt_input_ids, max_length=2000)
audio_arr = generation.cpu().numpy().squeeze()
sf.write("./tts/paimon.wav", audio_arr, model.config.sampling_rate)
print("Audio file saved to ./tts/paimon.wav")