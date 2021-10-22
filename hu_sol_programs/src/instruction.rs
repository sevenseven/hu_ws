use {
    borsh::{BorshDeserialize, BorshSerialize},
};

#[repr(C)]
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug, Clone)]
/// Args for init  call
pub struct InitAccountArgs {
    pub max_elements: u32, // 10000
    pub price: u32, // 1
    pub max_by_mint: u32, //20
}

#[repr(C)]
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug, Clone)]
pub struct MintAccountArgs {
    pub amount: u32,
    pub max_elements: u32, // 10000
    pub price: u32, // 1
    pub max_by_mint: u32, //20
}

/// Instructions supported by the Metadata program.
#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub enum HuInstruction {
    InitAccount(InitAccountArgs),

    MintAccount(MintAccountArgs),
    
}