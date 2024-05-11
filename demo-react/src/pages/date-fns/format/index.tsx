import { format } from "date-fns";
import { useEffect, useState } from "react";
import _ from "lodash";

const powerOn = "power_on";
const powerOff = "power_off";
const initTemp = "T--";
const initSpeed = "S--";
const defaultData = {
  power: true,
  temp: "T26",
  model: "M0",
  speed: "S1",
};

const DateFnsFormat = () => {
  const [name, setName] = useState("1");

  useEffect(() => {
    const d = {
      isNewDev: true,
      remoteCode: "020f1e0000000000070013001b00460144002600b50169",
      compressPulseList: [
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000400000@%00400000000034000074@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T18_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0400000@%004000000000340000B4@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T18_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040400000@%00400000000034000034@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T18_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080400000@%004000000000340000F4@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T18_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000480000@%0040000000003400007C@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T19_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0480000@%004000000000340000BC@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T19_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040480000@%0040000000003400003C@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T19_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080480000@%004000000000340000FC@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T19_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000440000@%00400000000034000070@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T20_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0440000@%004000000000340000B0@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T20_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040440000@%00400000000034000030@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T20_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080440000@%004000000000340000F0@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T20_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160004C0000@%00400000000034000078@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T21_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C04C0000@%004000000000340000B8@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T21_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160404C0000@%00400000000034000038@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T21_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160804C0000@%004000000000340000F8@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T21_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000420000@%00400000000034000076@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T22_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0420000@%004000000000340000B6@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T22_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040420000@%00400000000034000036@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T22_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080420000@%004000000000340000F6@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T22_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160004A0000@%0040000000003400007E@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T23_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C04A0000@%004000000000340000BE@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T23_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160404A0000@%0040000000003400003E@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T23_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160804A0000@%004000000000340000FE@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T23_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000460000@%00400000000034000072@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T24_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0460000@%004000000000340000B2@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T24_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040460000@%00400000000034000032@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T24_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080460000@%004000000000340000F2@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T24_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160004E0000@%0040000000003400007A@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T25_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C04E0000@%004000000000340000BA@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T25_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160404E0000@%0040000000003400003A@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T25_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160804E0000@%004000000000340000FA@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T25_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000410000@%00400000000034000075@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T26_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0410000@%004000000000340000B5@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T26_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040410000@%00400000000034000035@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T26_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080410000@%004000000000340000F5@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T26_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000490000@%0040000000003400007D@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T27_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0490000@%004000000000340000BD@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T27_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040490000@%0040000000003400003D@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T27_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080490000@%004000000000340000FD@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T27_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000450000@%00400000000034000071@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T28_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0450000@%004000000000340000B1@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T28_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040450000@%00400000000034000031@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T28_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080450000@%004000000000340000F1@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T28_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160004D0000@%00400000000034000079@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T29_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C04D0000@%004000000000340000B9@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T29_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160404D0000@%00400000000034000039@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T29_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160804D0000@%004000000000340000F9@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T29_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000430000@%00400000000034000077@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T30_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0430000@%004000000000340000B7@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T30_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040430000@%00400000000034000037@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T30_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080430000@%004000000000340000F7@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M0_T30_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000000000@%00400000000034000034@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T18_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0000000@%004000000000340000F4@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T18_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040000000@%00400000000034000074@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T18_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080000000@%004000000000340000B4@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T18_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000080000@%0040000000003400003C@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T19_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0080000@%004000000000340000FC@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T19_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040080000@%0040000000003400007C@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T19_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080080000@%004000000000340000BC@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T19_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000040000@%00400000000034000030@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T20_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0040000@%004000000000340000F0@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T20_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040040000@%00400000000034000070@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T20_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080040000@%004000000000340000B0@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T20_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160000C0000@%00400000000034000038@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T21_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C00C0000@%004000000000340000F8@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T21_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160400C0000@%00400000000034000078@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T21_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160800C0000@%004000000000340000B8@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T21_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000020000@%00400000000034000036@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T22_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0020000@%004000000000340000F6@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T22_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040020000@%00400000000034000076@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T22_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080020000@%004000000000340000B6@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T22_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160000A0000@%0040000000003400003E@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T23_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C00A0000@%004000000000340000FE@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T23_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160400A0000@%0040000000003400007E@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T23_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160800A0000@%004000000000340000BE@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T23_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000060000@%00400000000034000032@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T24_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0060000@%004000000000340000F2@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T24_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040060000@%00400000000034000072@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T24_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080060000@%004000000000340000B2@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T24_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160000E0000@%0040000000003400003A@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T25_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C00E0000@%004000000000340000FA@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T25_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160400E0000@%0040000000003400007A@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T25_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160800E0000@%004000000000340000BA@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T25_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000010000@%00400000000034000035@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T26_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0010000@%004000000000340000F5@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T26_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040010000@%00400000000034000075@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T26_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080010000@%004000000000340000B5@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T26_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000090000@%0040000000003400003D@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T27_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0090000@%004000000000340000FD@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T27_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040090000@%0040000000003400007D@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T27_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080090000@%004000000000340000BD@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T27_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000050000@%00400000000034000031@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T28_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0050000@%004000000000340000F1@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T28_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040050000@%00400000000034000071@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T28_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080050000@%004000000000340000B1@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T28_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160000D0000@%00400000000034000039@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T29_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C00D0000@%004000000000340000F9@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T29_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160400D0000@%00400000000034000079@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T29_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160800D0000@%004000000000340000B9@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T29_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000030000@%00400000000034000037@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T30_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0030000@%004000000000340000F7@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T30_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040030000@%00400000000034000077@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T30_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080030000@%004000000000340000B7@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M1_T30_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000800000@%004000000000340000B4@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M2_S0",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0800000@%00400000000034000074@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M2_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040800000@%004000000000340000F4@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M2_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080800000@%00400000000034000034@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M2_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C160C0200000@%004000000000340000D4@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M3_S1",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16040200000@%00400000000034000054@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M3_S2",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16080200000@%00400000000034000094@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M3_S3",
        },
        {
          keyId: 0,
          compressPulse:
            "01*&0030C16000C00000@%004000000000340000F4@%003800400000000040@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "M4_S0",
        },
        {
          keyName: "电源关",
          keyId: 0,
          compressPulse:
            "01*&0030C16020400000@%00400000000030000050@%003800800000000080@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "power_off",
        },
        {
          keyName: "电源开",
          keyId: 0,
          compressPulse:
            "01*&0030C16020410000@%00400000000034000055@%003800800000000080@^",
          exts: '{"99999":"020f1e0000000000070013001b00460144002600b50169"}',
          key: "power_on",
        },
      ],
      isSingleAir: false,
      remoteId: 11717,
    };

    const powerKeys: any = {};
    const modeKeys: any = {};
    let keys = [];
    let minTemp = 30;
    let isStudy = false;
    let studyIrCode = "";
    if (!d.isSingleAir) {
      d.compressPulseList.forEach((d1) => {
        const keyArr = d1.key.split("_");
        const exts = JSON.parse(d1.exts);
        const { compressPulse } = d1;
        if (!isStudy && exts.study) {
          isStudy = true;
          studyIrCode = exts[99999];
        }
        // console.log('======', d1.key, d1);

        if (keyArr.length <= 3) {
          if (keyArr[0] === "power") {
            powerKeys[d1.key] = compressPulse;
          } else {
            const reg = /^M(\d{1,4})$/;
            const r = keyArr[0].match(reg);

            if (r) {
              if (
                defaultData.model === keyArr[0] &&
                keyArr[1].indexOf("T") === 0
              ) {
                minTemp = Math.min(
                  minTemp,
                  parseInt(keyArr[1].substring(1), 10)
                );
              }

              if (!modeKeys[keyArr[0]]) {
                modeKeys[keyArr[0]] = {};
              }

              if (keyArr.length === 2) {
                if (keyArr[1].indexOf("T") === 0) {
                  modeKeys[keyArr[0]][keyArr[1]] = {};
                  modeKeys[keyArr[0]][keyArr[1]][initSpeed] = compressPulse;
                } else {
                  if (!modeKeys[keyArr[0]][initTemp]) {
                    modeKeys[keyArr[0]][initTemp] = {};
                  }

                  modeKeys[keyArr[0]][initTemp][keyArr[1]] = compressPulse;
                }
              } else {
                if (!modeKeys[keyArr[0]][keyArr[1]]) {
                  modeKeys[keyArr[0]][keyArr[1]] = {};
                }
                modeKeys[keyArr[0]][keyArr[1]][keyArr[2]] = compressPulse;
              }
            }
          }
        }
      });
    } else {
      keys = d.compressPulseList;
    }
    const _vender = _.get(d, "isNewDev", false) ? 0 : 3;
    // const { devId, isSubPanel, dpState, deviceState } = this.props;
    /* const firstMode = Object.keys(modeKeys)[0];
    const firstTemp = Object.keys(modeKeys[firstMode])[0];
    const firstSpeed = Object.keys(modeKeys[firstMode][firstTemp])[0];
    let dpPower, dpModel, dpTemp, dpSpeed;
    if (isSubPanel) {
      dpPower = dpState.switch_power;
      dpModel = `M${dpState.mode}`;
      dpTemp = `T${dpState.temperature}`;
      dpSpeed = `S${dpState.fan}`;
    } else {
      const dps = _.get(deviceState, [devId, "dps"], {});
      dpPower = dps[101];
      dpModel = `M${dps[102]}`;
      dpTemp = `T${dps[103]}`;
      dpSpeed = `S${dps[104]}`;
    }
    const data = {
      power: dpPower,
      model: _.has(modeKeys, dpModel) ? dpModel : firstMode,
      temp: _.has(modeKeys, [dpModel, dpTemp]) ? dpTemp : firstTemp,
      speed: _.has(modeKeys, [dpModel, dpTemp, dpSpeed]) ? dpSpeed : firstSpeed,
    }; */
  }, []);

  return (
    <div>
      <div>{format(new Date(), "yyyy-MM-dd")}</div>
      {name}
    </div>
  );
};

export default DateFnsFormat;
