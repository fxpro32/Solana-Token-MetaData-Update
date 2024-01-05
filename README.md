*** THIS SCRIPT DOES NOT WORK - SEEKING HELP FROM SOLANA - METAPLEX DEVS ***

HOW TO SETUP AND RUN SCRIPTS - TO MODIFY METADATA TO SOLANA TOKEN VIA METAPLEX
BY FXPRO - Copyright 2024 - GPL3.0 License

### Note that I made this script because of these MAIN reasons:
- Solana / Metaplex keep changing the Metadata versions/processes and it has become a nightmare to create metadata for your Solana Token
- Everytime I tried to find a 'how to' online, it either didn't work (for whatever reason) or it was using the older version updateV1 or updateV2
- Everybody I asked, had no idea
- No support from Solana or Metaplex, especially through their documentation which is Vague at best
- There is a total lack of information in the metaplex documentation which prohibits a dev to efficiently develop code
- There is no help ANYWHERE online so it was left up to me and GPT4 and google to find a solution :-)

#############################################################################################################
#################### Follow these instructions to implement the metadata via metaplex #######################
# Note that it is assumed:                                                                                  #
# a) You have already created your token                                                                    #
# b) You have added a number of tokens to the account                                                       #
# c) You have at least 0.01 SOL in your primary Solana Account that you use to create the tokens            #
# d) You have a general knowledge on how to navigate through Linux CLI and Create Solana Tokens             #
# e) You know that I do not offer support for this, its provided to you AS IS with no warranties whatsoever #
#############################################################################################################

DO THESE STEPS IN SEQUENCE:

1/ Make a new UPDATE folder in /home directory (within Linux) in the name of your Token
2/ Open a terminal in the new UPDATE folder you just made. Example: UPDATE_METADATA
3/ Put these 3 files in a the folder you just made, overwriting the 'tsconfig.json' file
4/ Then Issue the following commands:
# tsc -p tsconfig.json
# tsc update_metadata.ts
# node update_metadata.js

5/ If all goes well, you should have no errors and your Solana Token you created should now have metadata displayed on Solscan.io
6/ Note that when you run the 'tsc update_metadata.ts' command, you will get a ton of errors !!!

# I AM LOOKING FOR HELP WITH THIS FROM SOLANA / METAPLEX DEVS TO RESOLVE THE UPDATING ISSUE #
