import { BookOpen, Calendar } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { ReactNode } from "react";

interface ChapterCardProps {
  title: string;
  date: string;
  content: ReactNode;
}

const StoriesEN = () => {
  const { theme } = useTheme();

  const ChapterCard = ({ title, date, content }: ChapterCardProps) => (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl mb-8 transform transition-all duration-300 hover:scale-[1.01] ${
        theme === "dark"
          ? "bg-opacity-10 shadow-gray-900 hover:shadow-pink-900/20"
          : "bg-opacity-50 shadow-gray-200 hover:shadow-pink-500/20"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-all duration-300 ${
              theme === "dark" ? "bg-pink-900" : "bg-pink-100"
            }`}
          >
            <BookOpen
              className={`transition-all duration-300 ${
                theme === "dark" ? "text-pink-300" : "text-pink-600"
              }`}
              size={20}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              {title}
            </h2>
            <div className="flex items-center">
              <Calendar
                size={16}
                className={`${
                  theme === "dark" ? "text-pink-400" : "text-pink-600"
                }`}
              />
              <p
                className={`ml-2 text-base font-medium ${
                  theme === "dark" ? "text-pink-300" : "text-pink-600"
                }`}
              >
                {date}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`prose lg:prose-lg ${
            theme === "dark" ? "prose-invert" : ""
          } max-w-none`}
        >
          {content}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="container max-w-4xl mx-auto px-6 pb-24">
        <ChapterCard
          title="Chapter 1: The Day It All Began"
          date="February 16, 2025"
          content={
            <>
              <p className="text-lg leading-relaxed">
                The Day Everything Began:
              </p>

              <p className="text-lg leading-relaxed mt-4">
                It was Saturday, February 15th a typical weekend at the school
                library. The day was filled with laughter, funny jokes from all
                the volunteers, and a joyful atmosphere that made everything
                feel light and cheerful. It truly was a wonderful weekend. As
                closing time approached, most of the volunteers had already
                left. Only two of us stayed behind to tidy up the place me and a
                girl. She was kind, helpful, and what stood out the most was how
                she liked to do everything on her own, just like I used to be.
                We worked side by side, finishing up the last tasks of the day.
                While we we tidy up
              </p>

              <p className="text-lg leading-relaxed mt-4">
                She said that the next day, Sunday, February 16th, 2025, there
                would be a psychology class held in the library for the entire
                morning. Because of that, we needed to open the library earlier
                than usual unlike our typical schedule where we only opened on
                Saturdays. She asked me to help her prepare. At first, I
                hesitated, but when she explained that she'd be alone and needed
                someone else to help oversee things, I agreed. I promised her I
                would come.
              </p>

              <p className="text-lg leading-relaxed mt-4 italic">
                "I never imagined that this day would change our relationship so
                much…"
              </p>

              <p className="text-lg leading-relaxed mt-4">
                On the morning of February 16th, at exactly 7:20 a.m., I arrived
                as promised. I saw her there first and asked,{" "}
                <span className="italic">
                  "Oh, you're here already? Even earlier than me."
                </span>{" "}
                She smiled and said,{" "}
                <span className="italic">
                  "I thought maybe you wouldn't come."
                </span>{" "}
                I replied with a shy laugh,{" "}
                <span className="italic">
                  "How could I not come after making a promise?"
                </span>{" "}
                We then started arranging the room to be ready in time for the
                class. While the psychology session was happening, we sat and
                chatted, getting to know each other more. But I sensed that
                something was bothering her. She seemed different like she was
                holding back some kind of sadness. Curious and concerned, I
                gently asked her,{" "}
                <span className="italic">
                  "Is something bothering you? You don't look happy and cheerful
                  today."
                </span>
              </p>

              <p className="text-lg leading-relaxed mt-4">
                She looked at me and asked,{" "}
                <span className="italic">
                  "Would you be upset if I told you?"
                </span>{" "}
                I replied,{" "}
                <span className="italic">
                  "It's okay I don't mind You can tell me."
                </span>
              </p>

              <p className="text-lg leading-relaxed mt-4">
                After a moment of hesitation, she finally said,{" "}
                <span className="italic">
                  "Actually… I have a boyfriend. But he doesn't really treat me
                  well. He keeps hurting my feelings over and over again. That's
                  why I've been feeling so down lately…"
                </span>
              </p>

              <p className="text-lg leading-relaxed mt-4">
                I listened to her with empathy. I understood her, I had
                experienced something similar myself. So I decided to stay by
                her side, talk to her, and try to lift her spirits.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                After a little while, she asked with a soft smile,{" "}
                <span className="italic">
                  "Can we take a photo together? I've never had anyone take a
                  photo with me as a couple before..."
                </span>{" "}
                Seeing her warm expression, I agreed. After we took the picture,
                she said,
                <span className="italic">
                  "I'm really happy. I'm glad there's someone who's willing to
                  listen to me without judging… someone like you."
                </span>
              </p>

              <p className="text-lg leading-relaxed mt-4">
                At the time, I didn't think too deeply about it. I just thought
                it was a simple, kind moment.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                At around 11:15 a.m., the class ended. All the students and the
                teacher had already left only the two of us remained. I saw her
                cleaning up, so I decided to stay and help, out of genuine care.
                She told me,{" "}
                <span className="italic">
                  "It's okay, I can clean by myself. You can go."
                </span>{" "}
                But I replied,{" "}
                <span className="italic">
                  "It's fine I'll stay and help. I'm doing this from the bottom
                  of my heart."
                </span>
              </p>

              <p className="text-lg leading-relaxed mt-4">
                She smiled with appreciation, and we continued cleaning
                together. I then asked her,{" "}
                <span className="italic">"Do you like coffee?"</span> She
                answered, <span className="italic">"Yes, I do!"</span> So I
                said,{" "}
                <span className="italic">
                  "Once we're done cleaning, I'd like to take you to a café.
                  Would you be okay with that?"
                </span>{" "}
                She hesitated slightly, but eventually agreed, with a shy smile.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                At 11:30 a.m., we went to the café together. We sat down, talked
                about our feelings and daily life, and shared laughter and
                smiles her beautiful smile glowing throughout. It was a warm and
                peaceful moment, just before we went our separate ways...
              </p>

              <p className="text-lg leading-relaxed mt-4">
                From that moment, I found myself thinking about her all the
                time. I didn't know what this feeling was a strange mix of
                wanting and missing. I wanted to see her face every day, to be
                close to her, but we were like strangers. If I went a day
                without seeing her, I felt empty inside. I kept asking myself,
                Am I in love? Her beautiful smile, her joyful laughter stayed in
                my mind. But even with all these feelings, I never found a clear
                answer.
              </p>

              <div className="flex justify-center my-8">
                <div
                  className={`h-px w-1/3 ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                  }`}
                ></div>
              </div>
              <p className="text-lg leading-relaxed mt-4 italic">
                "From that moment, the connection between us started to grow.
                From just strangers slowly became two hearts getting closer
                together."
              </p>
            </>
          }
        />

        <ChapterCard
          title="Chapter 2: Everything Started To Change"
          date="March 24, 2025"
          content={
            <>
              <p className="text-lg leading-relaxed">
                School Library opening day:
              </p>
              <p className="text-lg leading-relaxed mt-4">
                For weeks, our school had been under maintenance—rooftops were
                being repaired, broken tables replaced, and inspections carried
                out in every corner. During that time, the school library was
                turned into a temporary teachers’ office. Students weren’t
                allowed inside, and for a while, that space—once filled with
                laughter and quiet moments—was closed off to us.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                I didn’t even know that I was allowed to go in until she told
                me. “As a library volunteer,” she said with a calm smile,
                “you’re allowed to go in anytime you want.”
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Then, on Monday, March 24th, an announcement was made: the
                library would finally reopen. Most students didn’t think much of
                it. But for me, it meant everything. The library had become
                something more—a place tied to a memory, a quiet connection, the
                beginning of something I didn’t yet have words for.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                And from that day on, everything truly began to change.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Every day after 11 a.m., once classes ended, I’d find myself
                walking into the library. She was usually already there—reading,
                waiting, organizing something, or just sitting quietly. Between
                11 and 1, those two hours slowly became a part of my daily life.
                I joke with her, share my studies, and feel very happy when I
                see her beautiful smile, laugh, and do small things together. I
                feel happy in my life.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Sometimes we talked, We jokes, other times we didn’t need to.
                We’d sit near each other in silence, and yet the air between us
                always felt warm. Safe. and Familiar.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                The library wasn't special to most students. Just a room with
                books and chairs. But to me, between those quiet hours of 11 to
                1, it was where everything started to change. just between us.
              </p>

              <p className="text-lg leading-relaxed mt-4">
                For months I was just a friend to her. A friend who understand
                everything, Who's know everything understanding her feeling
                knowing her struggle. I'm just a friend who was there for her
                when she needed someone to listen, to care, to be there. I never
                thought of crossing that line, never thought of making it more
                than just friendship. I was just being the person who she could
                rely on, the one who understood her without needing to say much.
                Untill...I corssed that line.
              </p>
            </>
          }
        />
        {/* 
        <ChapterCard
          title="Chapter 3: We Were No Longer Just Friends"
          date="March 24, 2025"
          content={
            <>
              <p className="text-lg leading-relaxed">
                The Moment Everything Changed:
              </p>
              <p className="text-lg leading-relaxed mt-4">
                It was during one of those quiet afternoons in the library when
                something shifted between us. The air felt different that day,
                charged with an unspoken understanding that had been building
                for weeks. We were sitting across from each other, books open
                but largely ignored, when she looked up and caught me watching
                her.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                "You've been staring," she said with a small smile, her cheeks
                flushing pink.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                I felt my own face grow warm. "Sorry, I was just... thinking."
              </p>
              <p className="text-lg leading-relaxed mt-4">
                "About what?" she asked, closing her book and leaning forward
                slightly.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                The question hung in the air between us. This was the moment I
                had been both dreading and hoping for. All those weeks of
                careful friendship, of being there for her without crossing
                lines, of pretending that my feelings weren't growing stronger
                every day.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                "About us," I said quietly. "About how I feel when I'm with
                you."
              </p>
              <p className="text-lg leading-relaxed mt-4">
                She was quiet for a long moment, her eyes searching my face.
                Then, so softly I almost didn't hear it, she said, "I feel it
                too."
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Those four words changed everything.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                We talked for hours that day, finally putting words to the
                feelings that had been building between us. She told me how she
                had started looking forward to our library meetings, how my
                presence had become the brightest part of her days. I shared how
                thinking about her had become as natural as breathing, how her
                smile had become my favorite sight in the world.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                "I was scared," she admitted. "After everything that happened
                before, I didn't want to trust these feelings again."
              </p>
              <p className="text-lg leading-relaxed mt-4">
                "And now?" I asked.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                She reached across the table and took my hand. "Now I think
                maybe it's worth the risk."
              </p>
              <p className="text-lg leading-relaxed mt-4">
                From that day forward, we were no longer just friends. We were
                something new, something that belonged entirely to us. The
                library remained our sanctuary, but now it held a different kind
                of magic. It was where two hearts had finally found the courage
                to beat in sync.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                We didn't need grand gestures or dramatic declarations. Our love
                story was written in quiet moments, in shared glances, in the
                comfortable silence of two people who had found their home in
                each other.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Sometimes the most beautiful beginnings are the ones that start
                with whispered confessions in empty libraries, where the only
                witnesses are books that have seen countless love stories unfold
                between their pages.
              </p>
            </>
          }
        /> */}
      </div>
    </div>
  );
};

export default StoriesEN;
