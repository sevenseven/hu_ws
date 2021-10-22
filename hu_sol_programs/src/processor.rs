use {
    crate::{
        instruction::{
            HuInstruction
        }
    },
    borsh::{BorshDeserialize, BorshSerialize},
    solana_program::{
        account_info::{next_account_info, AccountInfo},
        entrypoint::ProgramResult,
        msg,
        program_error::ProgramError,
        pubkey::Pubkey,
    }
};

pub fn process_instruction<'a>(
    program_id: &'a Pubkey,
    accounts: &'a [AccountInfo<'a>],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello World Rust program entrypoint");
    let instruction = HuInstruction::try_from_slice(instruction_data)?;
    match instruction {
        HuInstruction::InitAccount(args) => {
            msg!("Instruction: Init Hu Accounts");
            let account_info_iter = &mut accounts.iter();
            let init_account_info = next_account_info(account_info_iter)?;

            // Iterating accounts is safer then indexing
            let accounts_iter = &mut accounts.iter();

            // Get the account to say hello to
            let account = next_account_info(accounts_iter)?;

            // The account must be owned by the program in order to modify its data
            if account.owner != program_id {
                msg!("Greeted account does not have the correct program id");
                return Err(ProgramError::IncorrectProgramId);
            }
            args.serialize(&mut &mut init_account_info.data.borrow_mut()[..])?;
            Ok(())
        }
        HuInstruction::MintAccount(args) => {
            msg!("Instruction: Mint Hu Accounts {}", args.amount);
            Ok(())
        }
    }
}