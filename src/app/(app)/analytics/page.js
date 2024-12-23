import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isToday } from "date-fns";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
    await mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect('/');
    }

    const page = await Page.findOne({ owner: session?.user?.email });

    if (!page) {
        return (
            <div>
                <SectionBox>
                    <h2 className="text-xl text-center font-semibold">No data found</h2>
                </SectionBox>
            </div>
        );
    }

    // Fetch grouped views
    const groupedViews = await Event.aggregate([
        { $match: { type: 'view', uri: page.uri } },
        {
            $group: {
                _id: {
                    $dateToString: {
                        date: "$createdAt",
                        format: "%Y-%m-%d"
                    }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    // Fetch all clicks related to page links
    const clicks = await Event.find({
        type: 'click',
        uri: { $in: page.links.map(link => link.url) }
    });

    // Normalize URLs for comparison
    const normalizeUrl = (url) => {
        try {
            const parsed = new URL(url);
            return `${parsed.hostname}${parsed.pathname}`;
        } catch {
            return url; // Fallback for invalid URLs
        }
    };

    return (
        <div className="mt-8 px-4">
            <SectionBox>
                <h2 className="text-xl mb-6 text-center font-semibold">Views</h2>
                <Chart data={groupedViews.map(o => ({
                    date: o._id,
                    views: o.count
                }))} />
            </SectionBox>

            <SectionBox>
                <h2 className="text-xl mb-6 text-center font-semibold">Clicks</h2>

                {/* Render links with click analytics */}
                {page.links?.length > 0 ? (
                    page.links.map((link, index) => (
                        <div key={index} className="flex gap-4 items-center border-t border-gray-200 py-4">
                            <div className="text-blue-500 pl-4">
                                <FontAwesomeIcon icon={faLink} />
                            </div>
                            <div className="grow">
                                <h3 className="text-black">{link.title || 'No title'}</h3>
                                <p className="text-black">{link.subtitle || 'No subtitle'}</p>
                                <a target="_blank" href={link.url} className="text-blue-500">{link.url}</a>
                            </div>

                            {/* Clicks Today */}
                            <div className="text-center">
                                <div className="border rounded-md p-2">
                                    <div className="text-lg text-black">
                                        {clicks.filter(c =>
                                            normalizeUrl(c.uri) === normalizeUrl(link.url) &&
                                            isToday(new Date(c.createdAt))
                                        ).length}
                                    </div>
                                    <div className="text-gray-400 text-xs uppercase font-bold">Clicks today</div>
                                </div>
                            </div>

                            {/* Clicks All Time */}
                            <div className="text-center">
                                <div className="border rounded-md p-2">
                                    <div className="text-lg text-black">
                                        {clicks.filter(c => normalizeUrl(c.uri) === normalizeUrl(link.url)).length}
                                    </div>
                                    <div className="text-gray-400 text-xs uppercase font-bold">Clicks all time</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No links available</p>
                )}
            </SectionBox>
        </div>
    );
}
