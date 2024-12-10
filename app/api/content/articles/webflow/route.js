import {NextResponse} from "next/server";
import {webFlowClient} from "@/app/lib/webflow";

export async function GET(request) {


  const items = await webFlowClient.collections.items.listItemsLive("66e227a8827911a20b91604a",{
    offset: 100
  });

  return NextResponse.json({
    ...items
  })
}